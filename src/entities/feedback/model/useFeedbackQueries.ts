import { useQuery } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest';
import { APIResponse } from '@/shared/types/api.types';
import { Feedback } from '../feedback.types';

/* 피드백 목록 조회 */
export const useGetFeedbackList = (dataId?: number) => {
  const queryResult = useQuery<APIResponse<Feedback[]>, Error, Feedback[]>({
    queryKey: ['feedbacks', dataId],
    queryFn: async () => {
      return await apiRequest({
        url: `/api/v2/data/${dataId}/feedbacks`,
        method: 'GET',
      });
    },
    staleTime: 60 * 1000 * 5, // 5분
    select: (data) => data.result,
    enabled: !!dataId,
  });

  return queryResult;
};
