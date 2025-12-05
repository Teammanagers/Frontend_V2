import { useMutation } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest';

interface CreateFeedbackVariables {
  dataId: number;
  data: {
    content: string;
    parentId: number | null;
  };
}

/* 피드백 생성 */
export const useCreateFeedback = () => {
  return useMutation({
    mutationFn: async ({ dataId, data }: CreateFeedbackVariables) =>
      await apiRequest({
        url: `/api/v2/data/${dataId}/feedbacks`,
        method: 'POST',
        data,
      }),
  });
};
