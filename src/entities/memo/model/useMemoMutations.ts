import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/app/provider/queryClient';
import apiRequest from '@/shared/api/apiRequest';

interface IMemoInput {
  title: string;
  tags: string[];
  content: string;
  folderId?: number; // 생성시
  memoId?: number; // 수정시
}

interface IFolderInput {
  name: string;
  parentId?: number;
  folderId?: number;
}

interface IMemoFolderMoveInput {
  memoId: number;
  folderId: number;
}

const TEAM_ID = 3;

export default function useMemoMutations() {
  // 메모 생성
  const useCreateMemoMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (data: IMemoInput) => {
        const { title, content, tags, folderId } = data;
        await apiRequest({
          url: `/api/v2/memo/folders/${folderId}/teams/${TEAM_ID}`,
          method: 'POST',
          data: {
            title,
            content,
            memoTagList: tags,
          },
        });
      },
      onSuccess: (_, { folderId }) => {
        queryClient.invalidateQueries({ queryKey: ['memo', folderId] });
      },
    });
    return { mutate, data, isPending, isError, isSuccess };
  };

  // 폴더 생성
  const useCreateFolderMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (data: IFolderInput) => {
        const { name, parentId } = data;
        await apiRequest({
          url: `/api/v2/folder/${parentId}`,
          method: 'POST',
          data: { name },
        });
      },
      onSuccess: (_, { parentId }) => {
        queryClient.invalidateQueries({ queryKey: ['folder', parentId] });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  // 메모 고정 상태 변경 - isFixed UI return
  const useTogglePinMemoMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (memoId: number) => {
        return await apiRequest({
          url: `/api/v2/memo/${memoId}/fixing`,
          method: 'PATCH',
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['memo'] });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  // 폴더 삭제
  const useDeleteFolderMutation = (parentId: number) => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (folderId: number) => {
        await apiRequest({
          url: `/api/v2/folder/${folderId}`,
          method: 'DELETE',
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['folder', parentId] });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  // 메모 수정
  const useEditMemoMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (data: IMemoInput) => {
        const { memoId, title, content, tags } = data;
        return await apiRequest({
          url: `/api/v2/memo/${memoId}`,
          method: 'PATCH',
          data: { title, content, memoTagList: tags },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['memo'] });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  // 폴더명 수정
  const useEditFolderMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (data: IFolderInput) => {
        const { folderId, name } = data;
        await apiRequest({
          url: `/api/v2/folder/${folderId}`,
          method: 'PATCH',
          data: { name },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['folder'] });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  // 메모 삭제
  const useDeleteMemoMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (memoId: number) => {
        await apiRequest({
          url: `/api/v2/memo/${memoId}`,
          method: 'DELETE',
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['memo'] });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  // 메모 폴더 이동
  const useMoveMemoMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (data: IMemoFolderMoveInput) => {
        const { memoId, folderId } = data;
        await apiRequest({
          url: `/api/v2/memo/${memoId}/folder`,
          method: 'PATCH',
          data: { folderId },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['memo'] });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  return {
    useCreateMemoMutation,
    useCreateFolderMutation,
    useDeleteFolderMutation,
    useEditFolderMutation,
    useTogglePinMemoMutation,
    useEditMemoMutation,
    useDeleteMemoMutation,
    useMoveMemoMutation,
  };
}
