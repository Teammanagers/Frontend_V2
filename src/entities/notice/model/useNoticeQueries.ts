import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { queryClient } from '@/app/provider/queryClient';
import apiRequest from '@/shared/api/apiRequest';
import { useTeamStore } from '@/shared/model/store/teamStore';
import { QueryResponse } from '@/shared/types/api.types';
import { CreateNoticeRequest, FetchNoticeResponse } from '../notice.types';

export default function useNoticeQueries() {
  const teamId = useTeamStore((state) => state.teamId);

  // 최신 공지 조회
  const useRecentNoticeQuery = (): QueryResponse & {
    data: FetchNoticeResponse;
  } => {
    const { isPending, isError, error, isSuccess, data } = useQuery({
      queryKey: ['notice', 'recent'],
      queryFn: async () => {
        return await apiRequest({
          url: `/api/v2/team/${teamId}/notice`,
          method: 'GET',
        });
      },
      staleTime: 60 * 1000 * 10, // 10분
      select: (data) => data.result,
    });

    useEffect(() => {
      if (isError) {
        console.error('최신 공지 조회 실패', error);
      }
    }, [isError, isSuccess, data, error]);

    return { isPending, isError, isSuccess, data };
  };

  // 전체 공지 조회
  const useNoticeListQuery = (
    isOpen: boolean,
  ): QueryResponse & { data: FetchNoticeResponse[] } => {
    const { isPending, isError, error, isSuccess, data } = useQuery({
      queryKey: ['notice'],
      queryFn: async () => {
        return await apiRequest({
          url: `/api/v2/team/${teamId}/notice/list`,
          method: 'GET',
        });
      },
      staleTime: 60 * 1000 * 10, // 10분
      select: (data) => data.result,
      enabled: isOpen, // 모달 마운트 시에만 쿼리 실행
    });

    useEffect(() => {
      if (isError) {
        console.error('전체 공지 조회 실패', error);
      }
    }, [isError, isSuccess, data, error]);

    return { isPending, isError, isSuccess, data };
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
