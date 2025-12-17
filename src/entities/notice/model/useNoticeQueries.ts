import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/app/provider/queryClient';
import apiRequest from '@/shared/api/apiRequest';
import { useTeamStore } from '@/shared/model/store/teamStore';
import { APIResponse } from '@/shared/types/api.types';
import { CreateNoticeRequest, NoticeResponse } from '../notice.types';

export default function useNoticeQueries() {
  const teamId = useTeamStore((state) => state.teamId);

  // 최신 공지 조회
  const useRecentNoticeQuery = () => {
    const queryResult = useQuery({
      queryKey: ['notice', 'recent'],
      queryFn: async () => {
        return await apiRequest({
          url: `/api/v2/team/${teamId}/notice`,
          method: 'GET',
        });
      },
      staleTime: 60 * 1000 * 10, // 10분
      select: (data) => data.result,
      enabled: !!teamId,
    });

    return queryResult;
  };

  // 전체 공지 조회
  const useNoticeListQuery = (isOpen: boolean) => {
    const queryResult = useQuery<
      APIResponse<NoticeResponse[]>,
      Error,
      NoticeResponse[]
    >({
      queryKey: ['notice'],
      queryFn: async () => {
        return await apiRequest({
          url: `/api/v2/team/${teamId}/notice/list`,
          method: 'GET',
        });
      },
      staleTime: 60 * 1000 * 10, // 10분
      select: (data) => data.result,
      enabled: isOpen && !!teamId, // 모달 마운트 시에만 쿼리 실행
    });

    return queryResult;
  };

  // 공지 생성
  const useCreateNoticeMutation = () => {
    const { mutate, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (content: CreateNoticeRequest) => {
        return await apiRequest({
          url: `/api/v2/team/${teamId}/notice`,
          method: 'POST',
          data: content,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['notice'],
        });
      },
    });

    return { mutate, isPending, isError, isSuccess };
  };

  return {
    useRecentNoticeQuery,
    useNoticeListQuery,
    useCreateNoticeMutation,
  };
}
