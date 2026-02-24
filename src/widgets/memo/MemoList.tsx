import styled from 'styled-components';
import { MemoListViewProps } from '@/entities/memo/memo.type.ts';
import LoadingSpinner from '@/shared/components/loadingSpinner/loadingSpinner.tsx';
import MemoListView from '@/widgets/memo/MemoListView.tsx';
import MemoListSkeleton from '@/widgets/memo/ui/MemoListSkeleton.tsx';

export const MemoList = ({
  memos,
  folders,
  myMemosIds,
  isEmpty,
  isLoading,
  isRootFolder,
  uiState,
  handlers,
  onFolderClick,
  onMemoClick,
  currentFolderId,
  canAddFolder,
}: MemoListViewProps) => {
  if (isRootFolder && isLoading) {
    return (
      <Wrapper>
        <LoadingSpinner size={48} />
      </Wrapper>
    );
  }

  // 빈 화면 UI
  if (isEmpty && !isLoading && isRootFolder) {
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
        onMemoClick={onMemoClick}
      />
    );
  }

  // 나열 스켈레톤
  if (!isEmpty && isLoading && !isRootFolder) {
    return (
      <Container>
        <MemoListSkeleton variant="list" />
      </Container>
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
      onMemoClick={onMemoClick}
    />
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  margin-top: 52px;
`;
