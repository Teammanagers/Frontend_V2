import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance.ts';
import { MemoResponse, MemoType } from '@/shared/types/memo.types.ts';

export default function useMemoQueries() {
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
        return res.data.result.map((memo): MemoType => {
          return {
            id: memo.memoDto.id,
            title: memo.memoDto.title,
            content: memo.memoDto.content,
            tags: memo.memoTagList.map((tag) => tag.name),
          };
        });
      },
      staleTime: 60 * 1000,
    });
  };

  // 폴더 전체 조회
  const useFolderListQuery = (folderId: number) =>
    useQuery({
      queryKey: ['folder', folderId],
      queryFn: async () => {
        const res = await axiosInstance.get(`/api/v2/folder/${folderId}/list`, {
          params: { folderId },
        });
        return res.data.result;
      },
    });

  return {
    useMemoListQuery,
    useFolderListQuery,
  };
}
