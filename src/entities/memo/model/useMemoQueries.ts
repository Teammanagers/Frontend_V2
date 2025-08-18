import { useQuery } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest';
import {
  FolderDto,
  FolderResponse,
  FolderType,
  MemoResponse,
  MemoType,
} from '@/shared/types/memo.types';

const TEAM_ID = 3;

export default function useMemoQueries() {
  // 루트 폴더 조회
  const useRootFolderQuery = () => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['rootFolder', TEAM_ID],
      queryFn: () =>
        apiRequest({
          url: `/api/v2/folder/root/${TEAM_ID}`,
          method: 'GET',
        }),
      select: (res): FolderDto => res.result.folderDto,
      staleTime: 60 * 1000,
    });

    return { isPending, isError, isSuccess, data };
  };

  // 메모 전체 조회
  const useMemoListQuery = (folderId: number) => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['memo', folderId],
      enabled: Number.isFinite(folderId),
      queryFn: () =>
        apiRequest({
          url: `/api/v2/memo/list?folderId=${folderId}`,
          method: 'GET',
        }),
      select: (res): MemoType[] =>
        res.result.map((memo: MemoResponse) => ({
          id: memo.memoDto.id,
          title: memo.memoDto.title,
          content: memo.memoDto.content,
          tags: memo.memoTagList.map((t) => t.name),
          isFixed: memo.memoDto.isFixed,
        })),
      staleTime: 60 * 1000,
    });

    return { isPending, isError, isSuccess, data };
  };

  // 메모 단건 조회
  const useMemoDetailQuery = (memoId: number) => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['memoDetail', memoId],
      enabled: !!memoId,
      queryFn: () =>
        apiRequest({
          url: `/api/v2/memo/${memoId}`,
          method: 'GET',
        }),
      select: (res) => res.result,
    });

    return { isPending, isError, isSuccess, data };
  };

  // 폴더 전체 조회
  const useFolderListQuery = (folderId: number) => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['folder', folderId],
      enabled: Number.isFinite(folderId),
      queryFn: () =>
        apiRequest({
          url: `/api/v2/folder/${folderId}/list`,
          method: 'GET',
        }),
      select: (res): FolderType[] =>
        res.result.map((folder: FolderResponse) => ({
          id: folder.folderDto.id,
          title: folder.folderDto.name,
        })),
    });

    return { isPending, isError, isSuccess, data };
  };

  // 폴더 단건 조회
  const useFolderDetailQuery = (folderId: number) => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['folderDetail', folderId],
      enabled: Number.isFinite(folderId),
      queryFn: () =>
        apiRequest({
          url: `/api/v2/folder/${folderId}`,
          method: 'GET',
        }),
      select: (res): FolderDto => res.result.folderDto,
    });

    return { isPending, isError, isSuccess, data };
  };

  return {
    useRootFolderQuery,
    useMemoListQuery,
    useMemoDetailQuery,
    useFolderListQuery,
    useFolderDetailQuery,
  };
}
