import apiRequest from '@/shared/api/apiRequest';
import { TEAM_ID } from '@/shared/config/constants/team.constants';
import { APIResponse } from '@/shared/types/api.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/* 자료 업로드 */
export const useUploadResource = () => {
  return useMutation<APIResponse<{ dataId: number }>, Error, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      return await apiRequest({
        url: `/api/v2/data/${TEAM_ID}`,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },

    onError: () => {
      // TODO: 에러 핸들링
    },
  });
};

/* 자료 삭제 */
export const useDeleteResource = () => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse<void>, Error, number>({
    mutationFn: async (dataId) => {
      return await apiRequest({
        url: `/api/v2/data/${dataId}`,
        method: 'DELETE',
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resource', 'list'] });
    },

    onError: () => {
      // TODO: 에러 핸들링
    },
  });
};
