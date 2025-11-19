import { useParams } from 'react-router-dom';
import { PATHS } from '@/app/routes/paths.ts';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { useFolderPathBuilder } from '@/features/memo/model/useFolderPathBuilder.ts';
import { useMemoUIState } from '@/features/memo/model/useMemoUIState.ts';
import { useTeamNavigate } from '@/shared/hooks/useTeamNavigate.ts';
import { MemoList } from '@/widgets/memo/MemoList.tsx';

export function MemoPage() {
  const teamNavigate = useTeamNavigate();
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
    useMyMemoListQuery,
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
  const { data: myMemos } = useMyMemoListQuery();

  const canAddFolder = (currentFolder?.depth ?? 1) < 3;

  const sortedMemos = [...(memos ?? [])].sort((a, b) => {
    if (a.isFixed === b.isFixed) return 0;
    return a.isFixed ? -1 : 1;
  });

  useFolderPathBuilder(fid, ready);

  const isRootFolder = fid === rootFolder?.id;

  const isEmpty =
    isRootFolder &&
    !isMemosLoading &&
    !isFoldersLoading &&
    (memos?.length ?? 0) === 0 &&
    (folders?.length ?? 0) === 0;

  const myMemoIds = (myMemos ?? []).map((memo) => memo.id);

  const isLoading = isMemosLoading || isFoldersLoading || isRootLoading;

  const handleFolderClick = (folderId: number) => {
    teamNavigate((teamId) => `${PATHS.MEMO(teamId)}/${folderId}`);
  };

  return (
    <MemoList
      folders={folders || []}
      memos={sortedMemos || []}
      myMemosIds={myMemoIds}
      isEmpty={isEmpty}
      isLoading={isLoading}
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
}
