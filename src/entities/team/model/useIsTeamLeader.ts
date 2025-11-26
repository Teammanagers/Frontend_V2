import { useTeamStore } from '@/shared/model/store/teamStore';
import { useTeamMember } from './useTeamQueries';

export const useIsTeamLeader = () => {
  const myTeamMemberId = useTeamStore((state) => state.teamMemberId);

  // 팀 상세 정보 (리더 ID 포함)
  const { data: teamData } = useTeamMember();

  if (!teamData || !myTeamMemberId) return false;

  return teamData.leader.teamMemberId === myTeamMemberId;
};
