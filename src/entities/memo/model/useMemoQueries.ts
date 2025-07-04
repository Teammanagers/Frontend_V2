import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance.ts';

export default function useMemoQueries() {
  // 메모 전체 조회
  const useMemoListQuery = (folderId: number) =>
    useQuery({
      queryKey: ['memo', folderId],
      queryFn: async () => {
        const res = await axiosInstance.get(`/api/v2/memo/list`, {
          params: { folderId },
        });
        return res.data.result;
      },
    });

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
