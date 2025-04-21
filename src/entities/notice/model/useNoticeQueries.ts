import apiRequest from '@/shared/api/apiRequest';
import { queryClient } from '@/shared/config/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { CreateNoticeReqeust } from '../notice.types';

export default function useNoticeQueries() {
  // 공지 불러오기
  const useNoticeQuery = (teamId: number, content: string) => {
    const { isPending, isError, error, isSuccess, data } = useQuery({
      queryKey: ['notice'],
      queryFn: async () => {
        return await apiRequest({
          url: `/api/v2/team/${teamId}/notice`,
          method: 'POST',
          data: content,
        });
      },
    });

    useEffect(() => {
      if (data && isSuccess) {
        // 성공 시 로직
      }

      if (isError) {
        console.error('동아리 요약 정보 불러오기 실패', error);
      }
    }, [isError, isSuccess, data]);

    return { isPending };
  };

  // 공지 생성
  const useCreateNoticeMutation = () => {
    const { mutate, isPending, isError, isSuccess } = useMutation({
      mutationFn: async ({ teamId, content }: CreateNoticeReqeust) => {
        return await apiRequest({
          url: `/api/v2/team/${teamId}/notice`,
          method: 'POST',
          data: { content },
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
    useCreateNoticeMutation,
  };
}
