import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance.ts';
import { queryClient } from '@/shared/config/queryClient.ts';

export default function useMemoMutations() {
  const useCreateFolderMutation = () => {
    return useMutation({
      mutationFn: async ({
        name,
        parentId,
      }: {
        name: string;
        parentId: number;
      }) => {
        const res = await axiosInstance.post(`/api/v2/folder/${parentId}`, {
          name,
        });
        console.log('폴더 생성:', res);
        return res;
      },
      onSuccess: (_, { parentId }) => {
        queryClient.invalidateQueries({ queryKey: ['folder', parentId] });
      },
    });
  };

  return {
    useCreateFolderMutation,
  };
}
