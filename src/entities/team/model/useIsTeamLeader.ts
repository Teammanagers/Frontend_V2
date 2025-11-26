import { useTeamStore } from '@/shared/model/store/teamStore';
import { useTeamMember } from './useTeamQueries';

/**
 * 현재 사용자가 팀의 리더인지 확인하는 훅
 * @returns {boolean} 팀 리더 여부. 데이터 로딩 중이거나 사용자가 리더가 아닌 경우 false 반환
 */
export const useIsTeamLeader = () => {
  const myTeamMemberId = useTeamStore((state) => state.teamMemberId);

  // 팀 상세 정보 (리더 ID 포함)
  const { data: teamData } = useTeamMember();

  const isTeamLeader =
    !!teamData &&
    !!myTeamMemberId &&
    teamData.leader.teamMemberId === myTeamMemberId;

  return { isTeamLeader };
};
