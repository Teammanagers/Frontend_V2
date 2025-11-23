import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const { teamId } = useParams<{ teamId?: string }>();
  const parsedTeamId = Number(teamId);

  // api 데이터 매핑
  const teamList: TeamProps[] =
    myTeams?.map((item) => ({
      teamId: item.team.id,
      title: item.team.title,
      imageUrl: item.imgUrl ?? null,
    })) ?? [];

  useEffect(() => {
    if (!parsedTeamId || teamList.length === 0) return;

    const matchedTeam = teamList.find((t) => t.teamId === parsedTeamId);
    if (!matchedTeam) return;

    if (
      !currentTeam ||
      matchedTeam.imageUrl !== currentTeam.imageUrl ||
      matchedTeam.title !== currentTeam.title
    ) {
      setCurrentTeam(matchedTeam);
    }
  }, [parsedTeamId, teamList]);

  const handleNavigate = (path: (teamId: number) => string) => {
    setEndSelected(false);

    teamNavigate(path);
  };

  const handleToggleTeamList = () => setIsTeamListOpen((prev) => !prev);

  const handleTeamSelected = (team: TeamProps) => {
    setCurrentTeam(team);
    setIsTeamListOpen(false);
    teamNavigate(() => `/team/${team.teamId}`);
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
