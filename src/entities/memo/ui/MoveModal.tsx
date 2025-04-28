import styled from 'styled-components';
import { ModalContainer } from '@/entities/memo/ui/AddModal.tsx';
import folderData from '@/shared/assets/memo/folderData.json';
import Modal from '@/shared/components/modal/Modal.tsx';
import { ModalProps } from '@/shared/types/modal.types.ts';

export const MoveModal = ({ isOpen, toggle }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalContainer>
        {folderData.map((folder) => (
          <MenuContainer key={folder.id}>
            <MenuText>{folder.title}</MenuText>
            <Button>이동</Button>
          </MenuContainer>
        ))}
      </ModalContainer>
    </Modal>
  );
};

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  gap: 12px;
  border-radius: 4px;
  background: white;
  transition: background 0.2s;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.lightGray};
  }
`;

const MenuText = styled.span`
  font-size: 16px;
`;

const Button = styled.button`
  position: absolute;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 24px;
  background: ${({ theme }) => theme.colors.mainBlue};
  border-radius: 4px;
  font-size: 9px;
  font-weight: 700;
  line-height: 24px;
  color: white;
`;
