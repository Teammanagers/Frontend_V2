import { useQuery } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest';
import { useTeamStore } from '@/shared/model/store/teamStore.ts';
import { MemoType, FolderType } from '@/shared/types/memo.types';
import { FixedMemoResponse } from '../memo.type';

interface IMemoResponse {
  memoDto: {
    id: number;
    title: string;
    content: string;
    isFixed: boolean;
    folderId: number;
  };
  memoTagList: {
    id: number;
    name: string;
  }[];
}

export interface IFolderDto {
  id: number;
  name: string;
  depth: number;
  parentId: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  useYn: string;
}

interface IFolderResponse {
  folderDto: IFolderDto;
}

export default function useMemoQueries() {
  const teamId = useTeamStore((state) => state.teamId);

  // 루트 폴더 조회
  const useRootFolderQuery = () => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['rootFolder', teamId],
      queryFn: () =>
        apiRequest({
          url: `/api/v2/folder/root/${teamId}`,
          method: 'GET',
        }),
      select: (res): IFolderDto => res.result.folderDto,
      staleTime: 60 * 1000,
    });

    return { isPending, isError, isSuccess, data };
  };

  // 메모 전체 조회
  const useMemoListQuery = (folderId: number) => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['memo', folderId, teamId],
      enabled: Number.isFinite(folderId),
      queryFn: () =>
        apiRequest({
          url: `/api/v2/memo/list?folderId=${folderId}`,
          method: 'GET',
        }),
      select: (res): MemoType[] =>
        res.result.map((memo: IMemoResponse) => ({
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

  // 내가 쓴 메모 조회
  const useMyMemoListQuery = () => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['myMemo', teamId],
      queryFn: () =>
        apiRequest({
          url: `/api/v2/memo/my?teamId=${teamId}`,
          method: 'GET',
        }),
      select: (res): MemoType[] =>
        res.result.map((memo: IMemoResponse) => ({
          id: memo.memoDto.id,
          title: memo.memoDto.title,
          content: memo.memoDto.content,
          tags: memo.memoTagList.map((t) => t.name),
          isFixed: memo.memoDto.isFixed,
        })),
      enabled: !!teamId,
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
      select: (res): IMemoResponse => res.result,
    });

    return { isPending, isError, isSuccess, data };
  };

  // 폴더 전체 조회
  const useFolderListQuery = (parentId: number) => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['folder', parentId],
      enabled: Number.isFinite(parentId),
      queryFn: () =>
        apiRequest({
          url: `/api/v2/folder/${parentId}/list`,
          method: 'GET',
        }),
      select: (res): FolderType[] =>
        res.result.map((folder: IFolderResponse) => ({
          id: folder.folderDto.id,
          title: folder.folderDto.name,
        })),
      staleTime: 60 * 1000,
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
      select: (res): IFolderDto => res.result.folderDto,
    });

    return { isPending, isError, isSuccess, data };
  };

  return {
    useRootFolderQuery,
    useMemoListQuery,
    useMemoDetailQuery,
    useMyMemoListQuery,
    useFolderListQuery,
    useFolderDetailQuery,
  };
}

// 고정된 메모 조회
export const useFixedMemoList = () => {
  const teamId = useTeamStore((state) => state.teamId);

  const { isPending, isError, isSuccess, data } = useQuery({
    queryKey: ['memo', teamId, 'fixed'],
    queryFn: () =>
      apiRequest({
        url: `/api/v2/memo/fixed?teamId=${teamId}`,
        method: 'GET',
      }),
    select: (res): FixedMemoResponse[] => res.result,
    staleTime: 60 * 1000 * 5,
    enabled: !!teamId,
  });

  return { isPending, isError, isSuccess, data };
};
