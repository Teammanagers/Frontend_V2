import styled from 'styled-components';
import useTeamQueries from '@/entities/management/model/useTeamQueries.ts';
import useSideBarState from '@/features/sidebar/model/useSideBarState';
import { AddTeamModal } from '@/features/sidebar/ui/AddTeamModal';
import { TeamDropdown } from '@/features/sidebar/ui/TeamDropdown';
import Modal from '@/shared/components/modal/Modal';
import { getMemberIdFromToken } from '@/shared/lib/utils/getMemberIdFromToken.ts';
import SideBar from '@/widgets/sidebar/ui/SideBar';

export default function SideBarContainer() {
  const sidebar = useSideBarState();
  const memberId = getMemberIdFromToken();
  const { useTeamMemberQuery } = useTeamQueries();
  const { data: members } = useTeamMemberQuery();

  const {
    hover,
    isTeamListOpen,
    isAddTeamModalOpen,
    currentTeam,
    teamList,
    pathname,

    setHover,
    handleNavigate,
    handleTeamSelected,
    handleModalOpen,
    handleModalClose,
    handleCreateTeam,
    handleJoinTeam,
    setIsTeamListOpen,
    isAlarmOpen,
    setIsAlarmOpen,
  } = sidebar;

  const leaderId = members?.leader.member.id;
  const isLeader = memberId === leaderId;

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
        expanded={hover}
        activePath={pathname}
        isAlarmOpen={isAlarmOpen}
        team={teamData}
        isLeader={isLeader}
        onNavigate={handleNavigate}
        onToggleAlarm={() => setIsAlarmOpen((prev) => !prev)}
        onToggleTeamList={() => setIsTeamListOpen((prev) => !prev)}
      />

      {isTeamListOpen && (
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
