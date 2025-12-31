import { useParams } from 'react-router-dom';
import { PATHS } from '@/app/routes/paths.ts';
import { IFolderDto } from '@/entities/memo/model/useMemoQueries';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { useFolderPathBuilder } from '@/features/memo/model/useFolderPathBuilder.ts';
import { useMemoUIState } from '@/features/memo/model/useMemoUIState.ts';
import { useTeamNavigate } from '@/shared/hooks/useTeamNavigate.ts';
import { MemoList } from '@/widgets/memo/MemoList.tsx';

interface MemoListContainerProps {
  rootFolder: IFolderDto;
}

export function MemoListContainer({ rootFolder }: MemoListContainerProps) {
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
    useFolderListQuery,
    useMemoListQuery,
    useFolderDetailQuery,
    useMyMemoListQuery,
  } = useMemoQueries();

  const { folderId } = useParams<{ folderId?: string }>();
  const fid = folderId ? Number(folderId) : rootFolder.id;
  const ready = Number.isFinite(fid);

  const {
    data: memos,
    isPending: isMemosLoading,
    isSuccess: isMemosSuccess,
  } = useMemoListQuery(fid);
  const {
    data: folders,
    isPending: isFoldersLoading,
    isSuccess: isFoldersSuccess,
  } = useFolderListQuery(fid);
  const { data: currentFolder } = useFolderDetailQuery(fid);
  const { data: myMemos } = useMyMemoListQuery();

  useFolderPathBuilder(fid, ready);

  const canAddFolder = (currentFolder?.depth ?? 1) < 3;

  const sortedMemos = [...(memos ?? [])].sort((a, b) => {
    if (a.isFixed === b.isFixed) return 0;
    return a.isFixed ? -1 : 1;
  });
  const isLoading = isMemosLoading || isFoldersLoading;
  const isReady = isMemosSuccess && isFoldersSuccess;

  const isEmpty =
    isReady && (memos?.length ?? 0) === 0 && (folders?.length ?? 0) === 0;

  const isRootFolder = fid === rootFolder.id;

  const myMemoIds = (myMemos ?? []).map((memo) => memo.id);

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
}
