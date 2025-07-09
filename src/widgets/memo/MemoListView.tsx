import styled from 'styled-components';
import { MemoListViewProps } from '@/entities/memo/memo.type';
import { AddButton } from '@/entities/memo/ui/AddButton';
import { AddModal } from '@/entities/memo/ui/AddModal.tsx';
import { DeleteModal } from '@/entities/memo/ui/DeleteModal';
import { Folder } from '@/entities/memo/ui/Folder';
import { FolderModal } from '@/entities/memo/ui/FolderModal';
import { MoveModal } from '@/entities/memo/ui/MoveModal';
import { Memo } from '@/widgets/memo/Memo';

export const MemoListView = ({
  memos,
  folders,
  uiState,
  handlers,
}: MemoListViewProps) => {
  return (
    <>
      <MemoContainer>
        <Depth>전체</Depth>
        <ListContainer>
          <AddButton onClick={handlers.handleOpenAddModal} />

          {folders.map((folder) => (
            <Folder
              key={folder.id}
              folder={folder}
              onDeleteRequest={(id: number) =>
                handlers.handleDeleteRequest({
                  type: 'folder',
                  id,
                  title: folder.title,
                })
              }
            />
          ))}

          {memos.map((memo) => (
            <Memo
              key={memo.id}
              size="large"
              memo={memo}
              onDeleteRequest={(id: number) =>
                handlers.handleDeleteRequest({
                  type: 'memo',
                  id,
                  title: memo.title,
                })
              }
              onMoveRequest={(id: number) =>
                handlers.handleMoveRequest({
                  type: 'memo',
                  id,
                  title: memo.title,
                })
              }
            />
          ))}
        </ListContainer>
      </MemoContainer>

      {uiState.openAddModal && (
        <AddModal
          isOpen={true}
          toggle={handlers.closeAddModal}
          onAddFolder={handlers.handleAddFolder}
        />
      )}

      {uiState.deleteTarget && (
        <DeleteModal
          type={uiState.deleteTarget.type}
          name={uiState.deleteTarget.title}
          isOpen={true}
          toggle={handlers.closeDeleteModal}
        />
      )}

      {uiState.moveTarget && (
        <MoveModal isOpen={true} toggle={handlers.closeMoveModal} />
      )}

      {uiState.openFolderModal && (
        <FolderModal
          mode="create"
          isOpen={true}
          toggle={handlers.closeFolderModal}
        />
      )}
    </>
  );
};

const MemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 12px;
`;

const Depth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 78px;
  height: 40px;
  border-radius: 100px;
  border: 2px solid ${({ theme }) => theme.colors.mainBlue};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mainBlue};
  background: white;
`;

const ListContainer = styled.div`
  width: 1088px;
  height: 632px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 16px;
`;
