import { useState } from 'react';
import styled from 'styled-components';
import { Target } from '@/entities/memo/memo.type.ts';
import { AddButton } from '@/entities/memo/ui/AddButton.tsx';
import { DeleteModal } from '@/entities/memo/ui/DeleteModal.tsx';
import { Folder } from '@/entities/memo/ui/Folder.tsx';
import { MoveModal } from '@/entities/memo/ui/MoveModal.tsx';
import folderData from '@/shared/assets/memo/folderData.json';
import memoData from '@/shared/assets/memo/memoData.json';
import { Memo } from '@/widgets/memo/Memo.tsx';

export const MemoList = () => {
  const [deleteTarget, setDeleteTarget] = useState<Target | null>(null);
  const [moveTarget, setMoveTarget] = useState<Target | null>(null);

  const handleDeleteRequest = (target: Target) => {
    setDeleteTarget(target);
  };

  const handleMoveRequest = (target: Target) => {
    setMoveTarget(target);
  };

  const closeDeleteModal = () => {
    setDeleteTarget(null);
  };

  const closeMoveModal = () => {
    setMoveTarget(null);
  };

  return (
    <>
      <MemoContainer>
        <Depth>전체</Depth>
        <ListContainer>
          <AddButton />
          {folderData.map((folder) => (
            <Folder
              key={folder.id}
              folder={folder}
              onDeleteRequest={
                (id: number) =>
                  handleDeleteRequest({
                    type: 'folder',
                    id,
                    title: folder.title,
                  })
                //   폴더 뎁스가 1 초과시, onMoveRequest 추가
              }
            />
          ))}
          {memoData.map((memo) => (
            <Memo
              key={memo.id}
              size="large"
              memo={memo}
              onDeleteRequest={(id: number) =>
                handleDeleteRequest({ type: 'memo', id, title: memo.title })
              }
              onMoveRequest={(id: number) =>
                handleMoveRequest({ type: 'memo', id, title: memo.title })
              }
            />
          ))}
        </ListContainer>
      </MemoContainer>
      {deleteTarget && (
        <DeleteModal
          type={deleteTarget.type}
          name={deleteTarget.title}
          onClose={closeDeleteModal}
        />
      )}
      {moveTarget && (
        <MoveModal
          // 폴더 뎁스에 따라
          // type={moveTarget.type}
          // name={moveTarget.title}
          onClose={closeMoveModal}
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
