import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance.ts';
import { queryClient } from '@/shared/config/queryClient.ts';

export default function useMemoMutations() {
  // 메모 생성
  const useCreateMemoMutation = () => {
    return useMutation({
      mutationFn: async ({
        title,
        content,
        tags,
        folderId,
        teamId,
      }: {
        title: string;
        content: string;
        tags: string[];
        folderId: number;
        teamId: number;
      }) => {
        const res = await axiosInstance.post(
          `/api/v2/memo/${folderId}/teams/${teamId}`,
          {
            title,
            content,
            memoTagList: tags,
          },
        );
        console.log('메모 생성: ', res.data.result);
        return res.data.return;
      },
      onSuccess: (_, { folderId }) => {
        queryClient.invalidateQueries({ queryKey: ['memo', folderId] });
      },
    });
  };

  // 폴더 생성
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
        console.log('폴더 생성:', res.data.result);
        return res.data.result;
      },
      onSuccess: (_, { parentId }) => {
        queryClient.invalidateQueries({ queryKey: ['folder', parentId] });
      },
    });
  };

  // 메모 고정 상태 변경
  const useTogglePinMemoMutations = () => {
    return useMutation({
      mutationFn: async (memoId: number) => {
        const res = await axiosInstance.patch(`/api/v2/memo/${memoId}/fixing`);
        console.log('메모 고정 여부: ', res.data);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['memo'] });
      },
    });
  };

  // 폴더 삭제
  const useDeleteFolderMutation = (parentId: number) => {
    return useMutation({
      mutationFn: async (folderId: number) => {
        const res = await axiosInstance.delete(`/api/v2/folder/${folderId}`, {
          data: { folderId },
        });
        console.log('폴더 삭제');
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['folder', parentId] });
      },
    });
  };

  // 폴더명 수정
  const useEditFolderMutation = () => {
    return useMutation({
      mutationFn: async ({
        folderId,
        name,
      }: {
        folderId: number;
        name: string;
      }) => {
        const res = await axiosInstance.patch(`/api/v2/folder/${folderId}`, {
          name,
        });
        console.log('폴더 수정:', res.data);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['folder'] });
      },
    });
  };

  return {
    useCreateMemoMutation,
    useCreateFolderMutation,
    useDeleteFolderMutation,
    useEditFolderMutation,
    useTogglePinMemoMutations,
  };
}
