import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { useFolderPathStore } from '@/features/memo/model/folderStore.ts';
import { useMemoUIState } from '@/features/memo/model/useMemoUIState.ts';
import apiRequest from '@/shared/api/apiRequest.ts';
import { MemoListView } from '@/widgets/memo/MemoListView.tsx';

export const MemoList = () => {
  const navigate = useNavigate();
  const { setPath, resetPath } = useFolderPathStore();
  const {
    deleteTarget,
    moveTarget,
    openAddModal,
    openFolderModal,
    editFolder,
    handlers,
  } = useMemoUIState();

  const {
    useRootFolderQuery,
    useFolderListQuery,
    useMemoListQuery,
    useFolderDetailQuery,
  } = useMemoQueries();
  const { data: rootFolder, isPending: isRootLoading } = useRootFolderQuery();

  const { folderId } = useParams<{ folderId?: string }>();
  const resolvedFolderId = folderId ? Number(folderId) : rootFolder?.id;

  // NaN/undefined이면 준비 안 된 상태
  const fid = Number.isFinite(resolvedFolderId as number)
    ? (resolvedFolderId as number)
    : NaN;
  const ready = Number.isFinite(fid);

  const { data: memos, isPending: isMemosLoading } = useMemoListQuery(fid);
  const { data: folders, isPending: isFoldersLoading } =
    useFolderListQuery(fid);
  const { data: currentFolder } = useFolderDetailQuery(fid);

  useEffect(() => {
    if (!ready) return;

    let cancelled = false;

    async function buildPathFrom(id: number) {
      try {
        const chain: { id: number; name: string }[] = [];
        let curId: number | null = id;

        while (curId) {
          const res = await apiRequest({
            url: `/api/v2/folder/${curId}`,
            method: 'GET',
          });
          const dto = res?.result?.folderDto as
            | {
                id: number;
                name: string;
                parentId: number | null;
                depth: number;
              }
            | undefined;
          if (!dto) break;

          chain.unshift({
            id: dto.id,
            name: dto.depth === 1 ? '전체' : dto.name,
          });
          if (dto.depth === 1 || dto.parentId == null) break;
          curId = dto.parentId;
        }

        if (!cancelled) setPath(chain.slice(0, 3));
      } catch (e) {
        console.error('buildPathFrom 실패', e);
        if (!cancelled) resetPath();
      }
    }

    void buildPathFrom(fid);

    return () => {
      cancelled = true;
    };
  }, [ready, fid, setPath, resetPath]);

  if (!ready || isRootLoading) return <div>로딩 중...</div>;

  const canAddFolder = (currentFolder?.depth ?? 1) < 3;

  const sortedMemos = [...(memos ?? [])].sort((a, b) => {
    if (a.isFixed === b.isFixed) return 0;
    return a.isFixed ? -1 : 1;
  });

  const handleFolderClick = (folderId: number) => {
    navigate(`/memo/${folderId}`);
  };

  const isEmpty =
    !isMemosLoading &&
    !isFoldersLoading &&
    (memos?.length ?? 0) === 0 &&
    (folders?.length ?? 0) === 0;

  const isRootFolder = fid === rootFolder?.id;

  return (
    <MemoListView
      folders={folders || []}
      memos={sortedMemos || []}
      isEmpty={isEmpty}
      isRootFolder={isRootFolder}
      uiState={{
        deleteTarget,
        moveTarget,
        openAddModal,
        openFolderModal,
        editFolder,
      }}
      handlers={handlers}
      onFolderClick={handleFolderClick}
      currentFolderId={fid}
      canAddFolder={canAddFolder}
    />
  );
};
