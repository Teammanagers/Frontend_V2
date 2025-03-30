import styled from 'styled-components';
import { MoveModalProps } from '@/entities/memo/memo.type.ts';
import { ModalContainer } from '@/entities/memo/ui/AddModal.tsx';
import { Overlay } from '@/entities/memo/ui/DeleteModal.tsx';
import folderData from '@/shared/assets/memo/folderData.json';

export const MoveModal = ({ onClose }: MoveModalProps) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {folderData.map((folder) => (
          <MenuContainer key={folder.id}>
            <MenuText>{folder.title}</MenuText>
            <Button>이동</Button>
          </MenuContainer>
        ))}
      </ModalContainer>
    </Overlay>
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
