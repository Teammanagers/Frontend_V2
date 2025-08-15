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
          `/api/v2/memo/folders/${folderId}/teams/${teamId}`,
          {
            title,
            content,
            memoTagList: tags,
          },
        );
        return res.data.result;
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
        const res = await axiosInstance.delete(`/api/v2/folder/${folderId}`);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['folder', parentId] });
      },
    });
  };

  // 메모 수정
  const useEditMemoMutation = () => {
    return useMutation({
      mutationFn: async ({
        memoId,
        title,
        content,
        tags,
      }: {
        memoId: number;
        title: string;
        content: string;
        tags: string[];
      }) => {
        const res = await axiosInstance.patch(`/api/v2/memo/${memoId}`, {
          title,
          content,
          memoTagList: tags,
        });
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['memo'] });
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
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['folder'] });
      },
    });
  };

  // 메모 삭제
  const useDeleteMemoMutation = () => {
    return useMutation({
      mutationFn: async (memoId: number) => {
        const res = await axiosInstance.delete(`/api/v2/memo/${memoId}`);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['memo'] });
      },
    });
  };

  // 메모 폴더 이동
  const useMoveMemoMutation = () => {
    return useMutation({
      mutationFn: async ({
        memoId,
        folderId,
      }: {
        memoId: number;
        folderId: number;
      }) => {
        const res = await axiosInstance.patch(`/api/v2/memo/${memoId}/folder`, {
          folderId,
        });
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['memo'] });
      },
    });
  };

  return {
    useCreateMemoMutation,
    useCreateFolderMutation,
    useDeleteFolderMutation,
    useEditFolderMutation,
    useTogglePinMemoMutations,
    useEditMemoMutation,
    useDeleteMemoMutation,
    useMoveMemoMutation,
  };
}
