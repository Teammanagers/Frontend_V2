import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useSideBarQueries from '@/features/sidebar/model/useSideBarQueries.ts';
import { AddTeamModal } from '@/features/sidebar/ui/AddTeamModal.tsx';
import { TeamDropdown } from '@/features/sidebar/ui/TeamDropdown.tsx';
import Modal from '@/shared/components/modal/Modal.tsx';
import { TeamProps } from '@/widgets/sidebar';
import SideBar from '@/widgets/sidebar/ui/SideBar.tsx';

export default function SideBarContainer() {
  const [hover, setHover] = useState<boolean>(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState<boolean>(false);
  const [isTeamListOpen, setIsTeamListOpen] = useState<boolean>(false);
  const [endSelected, setEndSelected] = useState<boolean>(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState<boolean>(false);

  const { useMyTeamListQuery } = useSideBarQueries();
  const { data: myTeams } = useMyTeamListQuery();

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
  };

  const handleModalOpen = () => {
    setIsAddTeamModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddTeamModalOpen(false);
    setHover(false); // 사이드바 접힘
    setIsTeamListOpen(false); // 드롭다운 닫힘
  };

  const handleCreateTeam = () => {
    handleModalClose();
    navigate(`/make-team`);
  };

  const handleJoinTeam = () => {
    handleModalClose();
    navigate(`/team-join`);
  };

  // api 데이터 매핑
  const teamList: TeamProps[] =
    myTeams?.map((item) => ({
      teamId: item.team.id,
      title: item.team.title,
      imageUrl: item.imgUrl ?? null,
    })) ?? [];

  const currentTeam: TeamProps | null = teamList[0] ?? null;

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
          navigate('/management'); // / end로 분리되면 교체
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
