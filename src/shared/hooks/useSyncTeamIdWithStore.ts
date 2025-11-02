import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTeamStore } from '@/shared/model/store/teamStore';

/**
 * @description URL의 :teamId 파라미터를 감지하여
 * zustand 전역 스토어에 자동으로 동기화하는 훅입니다.
 */
export const useSyncTeamIdWithStore = () => {
  const { teamId: teamIdFromUrl } = useParams<{ teamId: string }>();
  const setTeamIdStore = useTeamStore((state) => state.setTeamId);

  useEffect(() => {
    const teamId = Number(teamIdFromUrl);

    if (!Number.isNaN(teamId) && teamId !== null && teamIdFromUrl !== '')
      setTeamIdStore(teamId);
  }, [teamIdFromUrl, setTeamIdStore]);
};
