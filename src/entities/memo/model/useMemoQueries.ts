import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance.ts';
import {
  FolderResponse,
  FolderType,
  MemoResponse,
  MemoType,
} from '@/shared/types/memo.types.ts';

export default function useMemoQueries() {
  // 루트 폴더 조회
  const useRootFolderQuery = (teamId: number) =>
    useQuery({
      queryKey: ['rootFolder', teamId],
      queryFn: async () => {
        const res = await axiosInstance.get<{
          result: FolderResponse;
        }>(`/api/v2/folder/root/${teamId}`);
        return res.data.result.folderDto;
      },
      staleTime: 60 * 1000,
    });

  // 메모 전체 조회
  const useMemoListQuery = (folderId: number) => {
    return useQuery({
      queryKey: ['memo', folderId],
      queryFn: async () => {
        const res = await axiosInstance.get<{ result: MemoResponse[] }>(
          `/api/v2/memo/list`,
          {
            params: { folderId },
          },
        );
        console.log('메모 조회: ', res.data);
        return res.data.result.map((memo): MemoType => {
          return {
            id: memo.memoDto.id,
            title: memo.memoDto.title,
            content: memo.memoDto.content,
            tags: memo.memoTagList.map((tag) => tag.name),
            isFixed: memo.memoDto.isFixed,
          };
        });
      },
      staleTime: 60 * 1000,
    });
  };

  // 메모 단건 조회
  const useMemoDetailQuery = (memoId: number) => {
    return useQuery({
      queryKey: ['memoDetail', memoId],
      queryFn: async () => {
        const res = await axiosInstance.get<{ result: MemoResponse }>(
          `/api/v2/memo/${memoId}`,
        );
        return res.data.result;
      },
      enabled: !!memoId,
    });
  };

  // 폴더 전체 조회
  const useFolderListQuery = (folderId: number) =>
    useQuery({
      queryKey: ['folder', folderId],
      queryFn: async () => {
        const res = await axiosInstance.get<{ result: FolderResponse[] }>(
          `/api/v2/folder/${folderId}/list`,
          {
            params: { folderId },
          },
        );
        return res.data.result.map(
          (folder): FolderType => ({
            id: folder.folderDto.id,
            title: folder.folderDto.name,
          }),
        );
      },
    });

  return {
    useRootFolderQuery,
    useMemoListQuery,
    useMemoDetailQuery,
    useFolderListQuery,
  };
}
