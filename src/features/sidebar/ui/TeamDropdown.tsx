import { useState } from 'react';
import styled from 'styled-components';
import Plus from '@/shared/assets/common/plus.svg?react';
import { TeamProps } from '@/widgets/sidebar';

interface DropdownProps {
  teams: TeamProps[];
  currentTeam: TeamProps | null;
  onTeamSelected: (team: TeamProps) => void;
  onAddTeamClick: () => void;
}

export const TeamDropdown = ({
  teams,
  currentTeam,
  onTeamSelected,
  onAddTeamClick,
}: DropdownProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  // 선택된 팀이 젤 위로 오도록 teams 배열 재정렬
  const sortedTeams = currentTeam
    ? [
        currentTeam,
        ...teams.filter((team) => team.teamId !== currentTeam.teamId),
      ]
    : teams;

  return (
    <DropDownContainer>
      {sortedTeams.map((team) => (
        <TeamContainer
          key={team.teamId}
          $isSelected={currentTeam?.teamId === team.teamId}
          $isHovered={hovered === team.teamId}
          onMouseEnter={() => setHovered(team.teamId)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onTeamSelected(team)}
        >
          {team.imageUrl ? (
            <LogoImg src={team.imageUrl} alt={team.title} />
          ) : (
            <FallbackLogo>{team.title.charAt(0)}</FallbackLogo>
          )}
          <TeamName>{team.title}</TeamName>
        </TeamContainer>
      ))}
      {/* 팀 추가 누르면 팝업 띄우기? */}
      <AddTeamBtn onClick={onAddTeamClick}>
        팀 추가하기
        <Plus stroke="#1D1D1D" strokeWidth={2} />
      </AddTeamBtn>
    </DropDownContainer>
  );
};

const DropDownContainer = styled.div`
  position: fixed;
  top: 58px;
  left: 4px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150px;
  padding: 9px 0 9px 0;
  gap: 12px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.1);
`;

interface TeamContainerProps {
  $isSelected: boolean;
  $isHovered: boolean;
}

const TeamContainer = styled.div<TeamContainerProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 32px;
  padding-left: 10px;

  background: ${({ $isSelected, $isHovered, theme }) =>
    $isSelected
      ? theme.colors.mainBlue
      : $isHovered
        ? theme.colors.background
        : theme.colors.white};

  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.white : theme.colors.black};

  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const LogoImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 3px;
`;

const FallbackLogo = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
`;

const TeamName = styled.span`
  font-weight: 500;
  font-size: 12px;
`;

const AddTeamBtn = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  gap: 12px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;
