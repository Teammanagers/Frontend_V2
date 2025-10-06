import { useState } from 'react';
import styled from 'styled-components';
import { TEAM_ID } from '@/entities/management/model/useTeamQueries.ts';
import { TeamProps } from '@/widgets/sidebar';

interface DropDownProps {
  teams: TeamProps[];
  currentTeam: TeamProps | null;
  onTeamSelected: (team: TeamProps) => void;
}

export const TeamDropdown = ({
  teams,
  currentTeam,
  onTeamSelected,
}: DropDownProps) => {
  console.log(`팀목록: ${teams}`);
  console.log(`현재 내 팀: ${currentTeam}`);
  const [hovered, setHovered] = useState<number | null>(null);

  // 선택된 팀이 젤 위로 오도록 teams 배열 재정렬
  const sortedTeams = currentTeam
    ? [currentTeam, ...teams.filter((team) => TEAM_ID !== currentTeam.team.id)]
    : teams;

  // const handleModal = () => {
  //   setModal(!modal);
  // };

  return (
    <DropDownContainer>
      {sortedTeams.map((team) => (
        <TeamContainer
          key={team.team.id}
          $isSelected={currentTeam?.team.id === team.team.id}
          $isHovered={hovered === team.team.id}
          onMouseEnter={() => setHovered(team.team.id)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onTeamSelected(team)}
        >
          <LogoImg src={team.imageUrl} alt={team.team.title} />
          {team.team.title}
        </TeamContainer>
      ))}

      {/* 팀 추가 누르면 팝업 띄우기? */}
      <AddTeamBtn /* onClick={handleModal} */>
        팀 추가하기
        {/*<Plus />*/}
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
  padding: 8px 0 8px 0;
  gap: 12px;
  background: white;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.1);
`;

interface TeamContainerProps {
  $isSelected: boolean;
  $isHovered: boolean;
}

const TeamContainer = styled.div<TeamContainerProps>`
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 140px;
  height: 32px;
  background: ${(props) =>
    (props.$isSelected && props.theme.colors.mainBlue) ||
    (props.$isHovered && props.theme.colors.background) ||
    'white'};
  gap: 12px;
  font-size: 12px;
  color: ${(props) => (props.$isSelected ? 'white' : props.theme.colors.black)};
  font-weight: 500;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 3px;
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
`;
