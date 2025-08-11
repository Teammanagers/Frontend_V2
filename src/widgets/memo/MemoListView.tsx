import styled from 'styled-components';
import { MemoListViewProps } from '@/entities/memo/memo.type';
import { AddButton } from '@/entities/memo/ui/AddButton';
import { AddModal } from '@/entities/memo/ui/AddModal.tsx';
import { DeleteModal } from '@/entities/memo/ui/DeleteModal';
import { Folder } from '@/entities/memo/ui/Folder';
import { FolderModal } from '@/entities/memo/ui/FolderModal';
import { MoveModal } from '@/entities/memo/ui/MoveModal';
import { BreadCrumb } from '@/features/memo/ui/BreadCrumb.tsx';
import { Memo } from '@/widgets/memo/Memo';

export const MemoListView = ({
  memos,
  folders,
  uiState,
  handlers,
  onFolderClick,
}: MemoListViewProps) => {
  return (
    <>
      <MemoContainer>
        <BreadCrumb />
        <ListContainer>
          <AddButton onClick={handlers.handleOpenAddModal} />
          {folders.map((folder) => (
            <Folder
              key={folder.id}
              folder={folder}
              onFolderClick={onFolderClick}
              onDeleteRequest={(id: number) =>
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
          id={uiState.deleteTarget.id}
          name={uiState.deleteTarget.title}
          isOpen={true}
          toggle={handlers.closeDeleteModal}
        />
      )}

      {uiState.moveTarget && (
        <MoveModal
          memoId={uiState.moveTarget.id}
          isOpen={true}
          toggle={handlers.closeMoveModal}
        />
      )}

      {uiState.openFolderModal && (
        <FolderModal
          mode={uiState.editFolder ? 'edit' : 'create'}
          isOpen={true}
          toggle={handlers.closeFolderModal}
          currentName={uiState.editFolder?.title}
          folderId={uiState.editFolder?.id}
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

const ListContainer = styled.div`
  width: 1088px;
  height: 632px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 16px;
`;
