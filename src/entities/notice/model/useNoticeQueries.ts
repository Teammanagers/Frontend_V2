import apiRequest from '@/shared/api/apiRequest';
import { queryClient } from '@/shared/config/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { CreateNoticeReqeust, FetchNoticeResponse } from '../notice.types';
import { TEAM_ID } from '@/shared/config/constants/team.constants';
import { QueryResponse } from '@/shared/types/api.types';

export default function useNoticeQueries() {
  // 최신 공지 조회
  const useRecentNoticeQuery = (): QueryResponse & {
    data: FetchNoticeResponse;
  } => {
    const { isPending, isError, error, isSuccess, data } = useQuery({
      queryKey: ['notice', 'recent'],
      queryFn: async () => {
        return await apiRequest({
          url: `/api/v2/team/${TEAM_ID}/notice`,
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
    }, [isError, isSuccess, data]);

    return { isPending, isSuccess, data };
  };

  // 전체 공지 조회
  const useNoticeListQuery = (
    isOpen: boolean,
  ): QueryResponse & { data: FetchNoticeResponse[] } => {
    const { isPending, isError, error, isSuccess, data } = useQuery({
      queryKey: ['notice'],
      queryFn: async () => {
        return await apiRequest({
          url: `/api/v2/team/${TEAM_ID}/notice/list`,
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
    }, [isError, isSuccess, data]);

    return { isPending, isError, isSuccess, data };
  };

  // 공지 생성
  const useCreateNoticeMutation = () => {
    const { mutate, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (content: CreateNoticeReqeust) => {
        return await apiRequest({
          url: `/api/v2/team/${TEAM_ID}/notice`,
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
