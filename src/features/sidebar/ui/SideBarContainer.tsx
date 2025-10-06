import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TEAM_ID } from '@/entities/management/model/useTeamQueries.ts';
import useSideBarQueries from '@/features/sidebar/model/useSideBarQueries.ts';
import { TeamDropdown } from '@/features/sidebar/ui/TeamDropdown.tsx';
import { TeamProps } from '@/widgets/sidebar';
import SideBar from '@/widgets/sidebar/ui/SideBar.tsx';

export default function SideBarContainer() {
  const [hover, setHover] = useState<boolean>(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState<boolean>(false);
  const [isTeamListOpen, setIsTeamListOpen] = useState<boolean>(false);
  const [endSelected, setEndSelected] = useState<boolean>(false);

  // const { useTeamByIdQuery } = useTeamQueries();
  // const { data: team, isPending: isTeamLoading } = useTeamByIdQuery();

  const { useMyTeamListQuery } = useSideBarQueries();
  const { data: myTeams, isPending: isMyTeamLoading } = useMyTeamListQuery();
  console.log('내 팀 목록: ', myTeams);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = (path: string) => {
    setEndSelected(false);
    navigate(path);
  };

  const handleToggleTeamList = () => setIsTeamListOpen((prev) => !prev);

  const handleTeamSelected = (team: TeamProps) => {
    console.log('선택한 팀: ', team);
    setIsTeamListOpen(false);
    // navigate
  };

  // 사이드바 팀 정보
  const currentTeam = myTeams?.[0];
  console.log('현재 팀: ', currentTeam);
  console.log('팀이 맞는지? ', currentTeam?.team.id === TEAM_ID);

  const teamData = currentTeam
    ? { title: currentTeam.team.title, imageUrl: currentTeam.imgUrl }
    : { title: '로딩중...', imageUrl: null };

  console.log('드롭다운 오픈? ', isTeamListOpen);

  console.log('둘다 true여야돼....', isTeamListOpen, myTeams);

  return (
    <Wrapper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <SideBar
        expanded={hover /* 알림 패널 붙이면 hover || isAlarmOpen */}
        activePath={pathname}
        isAlarmOpen={isAlarmOpen}
        endSelected={endSelected}
        team={teamData}
        onNavigate={handleNavigate}
        onToggleAlarm={() => setIsAlarmOpen((v) => !v)}
        onToggleTeamList={handleToggleTeamList}
        onEndClick={() => {
          setEndSelected(true);
          navigate('/management'); // / end로 분리되면 교체
        }}
      />
      {/* 버튼 누르면 드롭다운 표시 */}
      {isTeamListOpen && myTeams && (
        <DropdownWrapper>
          <TeamDropdown
            teams={myTeams}
            currentTeam={currentTeam}
            onTeamSelected={handleTeamSelected}
          />
        </DropdownWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  z-index: 2000;
`;
