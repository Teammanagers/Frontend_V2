import { MemoListViewProps } from '@/entities/memo/memo.type.ts';
import MemoListView, { Container } from '@/widgets/memo/MemoListView.tsx';
import MemoListSkeleton from '@/widgets/memo/ui/MemoListSkeleton.tsx';

export const MemoList = ({
  memos,
  folders,
  myMemosIds,
  isEmpty,
  isLoading,
  uiState,
  handlers,
  onFolderClick,
  currentFolderId,
  canAddFolder,
}: MemoListViewProps) => {
  // 빈 화면 스켈레톤
  if (isEmpty && isLoading) {
    return (
      <Container $center={true}>
        <MemoListSkeleton variant="empty" />
      </Container>
    );
  }

  // 나열 스켈레톤
  if (!isEmpty && isLoading) {
    return (
      <Container $center={true}>
        <MemoListSkeleton variant="list" />
      </Container>
    );
  }

  // 빈 화면 UI
  if (isEmpty && !isLoading) {
    return (
      <MemoListView
        state="empty"
        memos={memos}
        folders={folders}
        myMemosIds={myMemosIds}
        uiState={uiState}
        handlers={handlers}
        currentFolderId={currentFolderId}
        canAddFolder={canAddFolder}
        onFolderClick={onFolderClick}
      />
    );
  }

  // 나열 UI
  return (
    <MemoListView
      state="normal"
      memos={memos}
      folders={folders}
      myMemosIds={myMemosIds}
      uiState={uiState}
      handlers={handlers}
      currentFolderId={currentFolderId}
      canAddFolder={canAddFolder}
      onFolderClick={onFolderClick}
    />
  );
};
