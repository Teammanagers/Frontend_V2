import styled from 'styled-components';
import { MemoListViewProps } from '@/entities/memo/memo.type.ts';
import { AddButtonLarge } from '@/entities/memo/ui/AddButtonLarge';
import { AddButtonSmall } from '@/entities/memo/ui/AddButtonSmall';
import { AddModal } from '@/entities/memo/ui/AddModal';
import { DeleteModal } from '@/entities/memo/ui/DeleteModal';
import { Folder } from '@/entities/memo/ui/Folder';
import { FolderModal } from '@/entities/memo/ui/FolderModal';
import { MoveModal } from '@/entities/memo/ui/MoveModal';
import { BreadCrumb } from '@/features/memo/ui/BreadCrumb';
import { Memo } from '@/widgets/memo/Memo';

export default function MemoListView({
  state,
  memos,
  folders,
  myMemosIds,
  uiState,
  handlers,
  currentFolderId,
  canAddFolder,
  onFolderClick,
}: MemoListViewProps) {
  return (
    <Container $center={state === 'empty'}>
      {state === 'empty' ? (
        <AddButtonLarge onClick={handlers.handleOpenAddModal} />
      ) : (
        <>
          <BreadCrumbWrapper>
            <BreadCrumb />
          </BreadCrumbWrapper>

          <ListContainer>
            <AddButtonSmall onClick={handlers.handleOpenAddModal} />

            {folders.map((folder) => (
              <Folder
                key={folder.id}
                folder={folder}
                onFolderClick={onFolderClick}
                onDeleteRequest={(id) =>
                  handlers.handleDeleteRequest({
                    type: 'folder',
                    id,
                    title: folder.title,
                  })
                }
                onEditRequest={(folder) =>
                  handlers.handleEditFolderRequest(folder)
                }
              />
            ))}

            {memos.map((memo) => (
              <Memo
                key={memo.id}
                size="large"
                memo={memo}
                isMyMemo={myMemosIds?.includes(memo.id)}
                onDeleteRequest={(id) =>
                  handlers.handleDeleteRequest({
                    type: 'memo',
                    id,
                    title: memo.title,
                  })
                }
                onMoveRequest={(id) =>
                  handlers.handleMoveRequest({
                    type: 'memo',
                    id,
                    title: memo.title,
                  })
                }
              />
            ))}
          </ListContainer>
        </>
      )}

      {uiState.openAddModal && (
        <AddModal
          isOpen={true}
          toggle={handlers.closeAddModal}
          onAddFolder={handlers.handleAddFolder}
          canAddFolder={canAddFolder}
          parentId={currentFolderId}
        />
      )}

      {uiState.deleteTarget && (
        <DeleteModal
          type={uiState.deleteTarget.type}
          id={uiState.deleteTarget.id}
          name={uiState.deleteTarget.title}
          isOpen={true}
          toggle={handlers.closeDeleteModal}
          parentId={currentFolderId}
        />
      )}

      {uiState.moveTarget && (
        <MoveModal
          memoId={uiState.moveTarget.id}
          isOpen={true}
          toggle={handlers.closeMoveModal}
          parentId={currentFolderId}
        />
      )}

      {uiState.openFolderModal && (
        <FolderModal
          mode={uiState.editFolder ? 'edit' : 'create'}
          isOpen={true}
          toggle={handlers.closeFolderModal}
          currentName={uiState.editFolder?.title}
          folderId={uiState.editFolder?.id}
          parentId={currentFolderId}
        />
      )}
    </Container>
  );
}

export const Container = styled.div<{ $center?: boolean }>`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ $center }) => ($center ? 'center' : 'flex-start')};
  padding-top: ${({ $center }) => ($center ? '0' : '48px')};
`;

const BreadCrumbWrapper = styled.div`
  width: 1088px;
  display: flex;
  margin-bottom: 12px;
`;

const ListContainer = styled.div`
  width: 1088px;
  height: 632px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 16px;
`;
