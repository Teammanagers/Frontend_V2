import styled from 'styled-components';
import { ModalContainer } from '@/entities/memo/ui/AddModal.tsx';

export const MoveModal = () => {
  return (
    <ModalContainer>
      <MenuContainer>
        <MenuText>폴더명1</MenuText>
        <Button>이동</Button>
      </MenuContainer>
      <MenuContainer>
        <MenuText>폴더명2</MenuText>
        <Button>이동</Button>
      </MenuContainer>
    </ModalContainer>
  );
};

const MenuContainer = styled.button`
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
