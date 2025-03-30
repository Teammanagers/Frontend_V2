import { useState } from 'react';
import styled from 'styled-components';
import { AddButton } from '@/entities/memo/ui/AddButton.tsx';
import { DeleteModal } from '@/entities/memo/ui/DeleteModal.tsx';
import { Folder } from '@/entities/memo/ui/Folder.tsx';
import memoData from '@/shared/assets/memo/memoData.json';
import { Memo } from '@/widgets/memo/Memo.tsx';

export const MemoList = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState<number | null>(null);

  const selectedMemo = memoData.find(({ id }) => id === openDeleteModal);

  const handleDeleteRequest = (id: number) => {
    setOpenDeleteModal(id);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(null);
  };

  return (
    <>
      <MemoContainer>
        <Depth>전체</Depth>
        <ListContainer>
          <AddButton />
          <Folder />
          <Folder />
          <Folder />
          {memoData.map((memo) => (
            <Memo
              key={memo.id}
              size="large"
              memo={memo}
              onDeleteRequest={handleDeleteRequest}
            />
          ))}
        </ListContainer>
      </MemoContainer>
      {openDeleteModal && selectedMemo && (
        <DeleteModal
          type="memo"
          name={selectedMemo.title}
          onClose={closeDeleteModal}
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
