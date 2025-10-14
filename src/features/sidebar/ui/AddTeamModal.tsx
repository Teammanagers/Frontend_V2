import { ButtonHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import Plus from '@/shared/assets/common/plus.svg?react';
import Close from '@/shared/assets/sidebar/close.svg?react';
import Search from '@/shared/assets/sidebar/search.svg?react';

interface AddTeamModalProps {
  modalClose: () => void;
  onCreateTeamClick: () => void;
  onJoinTeamClick: () => void;
}

export const AddTeamModal = ({
  modalClose,
  onCreateTeamClick,
  onJoinTeamClick,
}: AddTeamModalProps) => {
  const [hover, setHover] = useState<number | null>(null);

  const handleHover = (index: number | null) => {
    setHover(index);
  };

  return (
    <AddTeamModalContainer>
      <TopContainer>
        <Title>팀 추가하기</Title>
        <CloseBtn onClick={modalClose} />
      </TopContainer>
      <MenuContainer
        onMouseEnter={() => {
          handleHover(0);
        }}
        onMouseLeave={() => {
          handleHover(null);
        }}
        $isHovered={hover === 0}
        onClick={onCreateTeamClick}
      >
        <MenuText>새로운 팀 생성하기</MenuText>
        <Plus stroke="#1D1D1D" strokeWidth={2} />
      </MenuContainer>
      <MenuContainer
        onMouseEnter={() => {
          handleHover(1);
        }}
        onMouseLeave={() => {
          handleHover(null);
        }}
        $isHovered={hover === 1}
        onClick={onJoinTeamClick}
      >
        <MenuText>다른 팀 참가하기</MenuText>
        <Search />
      </MenuContainer>
    </AddTeamModalContainer>
  );
};

const AddTeamModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 620px;
  height: 182px;
  gap: 12px;
  border-radius: 8px;
  flex-direction: column;
  background: white;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 540px;
  height: 30px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
`;

const CloseBtn = styled(Close)<ButtonHTMLAttributes<HTMLButtonElement>>`
  margin-bottom: 12px;
  cursor: pointer;
`;

interface HoverProps {
  $isHovered: boolean;
}

const MenuContainer = styled.div<HoverProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 540px;
  height: 40px;
  gap: 12px;
  background: ${({ $isHovered, theme }) =>
    $isHovered ? theme.colors.background : 'white'};
  cursor: pointer;
`;

const MenuText = styled.p`
  font-size: 16px;
  font-weight: 400;
`;
