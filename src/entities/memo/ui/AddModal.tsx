import styled from 'styled-components';
import { Overlay } from '@/entities/memo/ui/DeleteModal.tsx';
import AddFolderIcon from '@/shared/assets/memo/add-folder.svg?react';
import AddMemoIcon from '@/shared/assets/memo/add-memo.svg?react';
import { ModalProps } from '@/shared/types/modal.types.ts';

export const AddModal = ({ onClose }: ModalProps) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <MenuContainer>
          메모 추가하기
          <AddMemo />
        </MenuContainer>
        <MenuContainer>
          폴더 추가하기
          <AddFolder />
        </MenuContainer>
      </ModalContainer>
    </Overlay>
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
