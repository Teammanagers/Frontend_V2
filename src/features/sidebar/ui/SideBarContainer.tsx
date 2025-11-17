import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PATHS, ROUTE_SEGMENTS } from '@/app/routes/paths';
import useSideBarQueries from '@/features/sidebar/model/useSideBarQueries.ts';
import { AddTeamModal } from '@/features/sidebar/ui/AddTeamModal.tsx';
import { TeamDropdown } from '@/features/sidebar/ui/TeamDropdown.tsx';
import Modal from '@/shared/components/modal/Modal.tsx';
import { useTeamNavigate } from '@/shared/hooks/useTeamNavigate';
import { TeamProps } from '@/widgets/sidebar';
import SideBar from '@/widgets/sidebar/ui/SideBar.tsx';

export default function SideBarContainer() {
  const [hover, setHover] = useState<boolean>(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState<boolean>(false);
  const [isTeamListOpen, setIsTeamListOpen] = useState<boolean>(false);
  const [endSelected, setEndSelected] = useState<boolean>(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState<boolean>(false);
  const [currentTeam, setCurrentTeam] = useState<TeamProps | null>(null);

  const { useMyTeamListQuery } = useSideBarQueries();
  const { data: myTeams } = useMyTeamListQuery();

  const navigate = useNavigate();
  const teamNavigate = useTeamNavigate();
  const { pathname } = useLocation();

  // api 데이터 매핑
  const teamList: TeamProps[] =
    myTeams?.map((item) => ({
      teamId: item.team.id,
      title: item.team.title,
      imageUrl: item.imgUrl ?? null,
    })) ?? [];

  useEffect(() => {
    if (teamList.length > 0 && !currentTeam) {
      setCurrentTeam(teamList[0]);
    }
  }, [teamList]);

  useEffect(() => {
    if (!currentTeam) return;

    const updated = teamList.find((t) => t.teamId === currentTeam.teamId);

    if (updated && updated.imageUrl !== currentTeam.imageUrl) {
      setCurrentTeam(updated);
    }
  }, [teamList, currentTeam]);

  const handleNavigate = (path: (teamId: number) => string) => {
    setEndSelected(false);

    teamNavigate(path);
  };

  const handleToggleTeamList = () => setIsTeamListOpen((prev) => !prev);

  const handleTeamSelected = (team: TeamProps) => {
    console.log('선택한 팀: ', team);
    setIsTeamListOpen(false);
    // 다른 팀으로 이동
  };

  const handleModalOpen = () => {
    setIsAddTeamModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddTeamModalOpen(false);
    setHover(false);
    setIsTeamListOpen(false);
  };

  const handleCreateTeam = () => {
    handleModalClose();
    navigate(`/${ROUTE_SEGMENTS.MAKE_TEAM}`);
  };

  const handleJoinTeam = () => {
    handleModalClose();
    navigate(`/${ROUTE_SEGMENTS.TEAM_JOIN}`);
  };

  const teamData = currentTeam
    ? {
        teamId: currentTeam.teamId,
        title: currentTeam.title,
        imageUrl: currentTeam.imageUrl,
      }
    : { teamId: null, title: '로딩중...', imageUrl: null };

  return (
    <Wrapper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setIsTeamListOpen(false);
      }}
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
          teamNavigate(PATHS.END);
        }}
      />
      {/* 버튼 누르면 드롭다운 표시 */}
      {isTeamListOpen && myTeams && (
        <DropdownWrapper>
          <TeamDropdown
            teams={teamList}
            currentTeam={currentTeam}
            onTeamSelected={handleTeamSelected}
            onAddTeamClick={handleModalOpen}
          />
        </DropdownWrapper>
      )}
      {isAddTeamModalOpen && (
        <Modal isOpen={isAddTeamModalOpen} toggle={handleModalClose}>
          <AddTeamModal
            modalClose={handleModalClose}
            onCreateTeamClick={handleCreateTeam}
            onJoinTeamClick={handleJoinTeam}
          />
        </Modal>
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
