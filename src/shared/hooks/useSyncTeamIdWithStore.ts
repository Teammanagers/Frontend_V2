import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMyTeamMemberId } from '@/entities/team/model/useTeamQueries';
import { useTeamStore } from '@/shared/model/store/teamStore';

/**
 * @description URL의 :teamId 파라미터를 감지하여
 * zustand 전역 스토어에 자동으로 동기화하는 훅입니다.
 */
export const useSyncTeamIdWithStore = () => {
  const { teamId: teamIdFromUrl } = useParams<{ teamId: string }>();
  const setTeamId = useTeamStore((state) => state.setTeamId);
  const setTeamMemberId = useTeamStore((state) => state.setTeamMemberId);

  // url 변경 시 teamId 동기화
  useEffect(() => {
    const teamId = Number(teamIdFromUrl);

    if (!Number.isNaN(teamId) && teamId !== null && teamIdFromUrl !== '')
      setTeamId(teamId);
  }, [teamIdFromUrl, setTeamId]);

  // 팀 멤버 아이디 동기화
  const { data: myTeamMemberId, isSuccess } = useMyTeamMemberId();

  useEffect(() => {
    if (isSuccess && myTeamMemberId) setTeamMemberId(myTeamMemberId);
  }, [teamIdFromUrl, isSuccess, myTeamMemberId, setTeamMemberId]);
};
