import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AddModalProps } from '@/entities/memo/memo.type.ts';
import AddFolderIcon from '@/shared/assets/memo/add-folder.svg?react';
import AddMemoIcon from '@/shared/assets/memo/add-memo.svg?react';
import Modal from '@/shared/components/modal/Modal.tsx';

export const AddModal = ({
  isOpen,
  toggle,
  onAddFolder,
  canAddFolder,
  parentId,
}: AddModalProps) => {
  const navigate = useNavigate();

  const handleAddMemo = () => {
    navigate(`/memo/${parentId}/write`);
    toggle();
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalContainer>
        <MenuContainer onClick={handleAddMemo}>
          메모 추가하기
          <AddMemo />
        </MenuContainer>
        {canAddFolder && (
          <MenuContainer
            onClick={() => {
              onAddFolder();
              toggle();
            }}
          >
            폴더 추가하기
            <AddFolder />
          </MenuContainer>
        )}
      </ModalContainer>
    </Modal>
  );
};

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 552px;
  gap: 12px;
  padding: 24px 40px;
  border-radius: 8px;
  background: white;
`;

const MenuContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  gap: 12px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  background: white;
  transition: background 0.2s;
  color: ${({ theme }) => theme.colors.darkGray};

  &:hover {
    background: ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.black};
  }
  &:active {
    background: ${({ theme }) => theme.colors.silver};
    color: ${({ theme }) => theme.colors.black};
  }

  &:hover svg,
  &:active svg {
    stroke: ${({ theme }) => theme.colors.black};
  }
`;

const AddMemo = styled(AddMemoIcon)`
  width: 24px;
  height: 24px;
  stroke: ${({ theme }) => theme.colors.darkGray};
  transition: stroke 0.2s;
`;

const AddFolder = styled(AddFolderIcon)`
  width: 24px;
  height: 24px;
  stroke: ${({ theme }) => theme.colors.darkGray};
  transition: stroke 0.2s;
`;
