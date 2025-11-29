import styled from 'styled-components';
import { useTeamStore } from '@/shared/model/store/teamStore';
import { SideBarProps } from '@/widgets/sidebar/sidebar.types.ts';
import SideBarLogo from '@/widgets/sidebar/ui/SideBarLogo';
import SideBarNav from '@/widgets/sidebar/ui/SideBarNav';

export default function SideBar({
  expanded,
  activePath,
  isAlarmOpen,
  endSelected,
  team,
  onNavigate,
  onToggleAlarm,
  onToggleTeamList,
  onEndClick,
}: SideBarProps) {
  const teamId = useTeamStore((state) => state.teamId);

  if (!teamId) return null;

  return (
    <SideBarContainer $expanded={expanded}>
      <SideBarLogo
        expanded={expanded}
        team={team}
        onToggleTeamList={onToggleTeamList}
      />

      <Hr style={{ margin: '11px 0 11px 0' }} />

      <SideBarNav
        teamId={teamId}
        activePath={activePath}
        expanded={expanded}
        isAlarmOpen={isAlarmOpen}
        endSelected={endSelected}
        onNavigate={onNavigate}
        onToggleAlarm={onToggleAlarm}
        onEndClick={onEndClick}
      />
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div<{ $expanded: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: ${({ $expanded }) => ($expanded ? '158px' : '80px')};
  height: 832px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 4px 0 16px 0 rgba(0, 0, 0, 0.06);
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.subLightBlue};
  margin: 11px 0;
`;
