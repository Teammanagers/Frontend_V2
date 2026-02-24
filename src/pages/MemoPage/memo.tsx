import { useParams } from 'react-router-dom';
import { PATHS } from '@/app/routes/paths.ts';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { useFolderPathBuilder } from '@/features/memo/model/useFolderPathBuilder.ts';
import { useMemoUIState } from '@/features/memo/model/useMemoUIState.ts';
import { useTeamNavigate } from '@/shared/hooks/useTeamNavigate.ts';
import { PageWrapper } from '@/shared/ui/PageWrapper.tsx';
import { MemoList } from '@/widgets/memo/MemoList.tsx';

export function MemoPage() {
  const teamNavigate = useTeamNavigate();
  const { folderId } = useParams<{ folderId?: string }>();

  const {
    useRootFolderQuery,
    useFolderListQuery,
    useMemoListQuery,
    useFolderDetailQuery,
    useMyMemoListQuery,
  } = useMemoQueries();

  const { data: rootFolder } = useRootFolderQuery();

  const {
    deleteTarget,
    moveTarget,
    openAddModal,
    openFolderModal,
    editFolder,
    handlers,
  } = useMemoUIState();

  const fid =
    folderId && Number.isFinite(Number(folderId))
      ? Number(folderId)
      : rootFolder?.id;

  const {
    data: memos,
    isPending: isMemosLoading,
    isSuccess: isMemosSuccess,
  } = useMemoListQuery(fid ?? 0);

  const {
    data: folders,
    isPending: isFoldersLoading,
    isSuccess: isFoldersSuccess,
  } = useFolderListQuery(fid ?? 0);

  const { data: currentFolder } = useFolderDetailQuery(fid ?? 0);
  const { data: myMemos } = useMyMemoListQuery();

  useFolderPathBuilder(fid ?? 0, !!fid);

  if (!rootFolder) return null;

  const canAddFolder = (currentFolder?.depth ?? 1) < 3;

  const sortedMemos = [...(memos ?? [])].sort((a, b) =>
    a.isFixed === b.isFixed ? 0 : a.isFixed ? -1 : 1,
  );

  const isLoading = isMemosLoading || isFoldersLoading;
  const isReady = isMemosSuccess && isFoldersSuccess;

  const isEmpty =
    isReady && (memos?.length ?? 0) === 0 && (folders?.length ?? 0) === 0;

  const isRootFolder = fid === rootFolder.id;

  const myMemoIds = (myMemos ?? []).map((memo) => memo.id);

  const handleFolderClick = (folderId: number) => {
    teamNavigate((teamId) => `${PATHS.MEMO(teamId)}/${folderId}`);
  };

  const handleMemoClick = (memoId: number) => {
    teamNavigate((teamId) => `${PATHS.MEMO(teamId)}/${fid}/${memoId}`);
  };

  return (
    <PageWrapper>
      <MemoList
        folders={folders || []}
        memos={sortedMemos}
        myMemosIds={myMemoIds}
        isEmpty={isEmpty}
        isLoading={isLoading}
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
        onMemoClick={handleMemoClick}
        currentFolderId={fid!}
        canAddFolder={canAddFolder}
      />
    </PageWrapper>
  );
}
