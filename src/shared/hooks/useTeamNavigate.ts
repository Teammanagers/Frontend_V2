import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeamStore } from '../model/store/teamStore';

/**
 * @description 현재 팀 ID를 기반으로 특정 경로로 네비게이션하는 훅입니다.
 * @example
 *  ```tsx
 * import { PATHS } from '@/app/routes/paths';
 *
 * const teamNavigate = useTeamNavigate();
 *
 * const handleNavigate = () => {
 *   teamNavigate(PATHS.MY_PAGE);
 * }
 * ```
 */
export const useTeamNavigate = () => {
  const navigate = useNavigate();

  /**
   * @param pathFunction 팀 ID를 인자로 받아 경로 문자열을 반환하는 함수 (PATHS 객체의 메서드 형태)
   */
  const teamNavigate = useCallback(
    (pathFunction: (teamId: number) => string) => {
      const { teamId: currTeamId } = useTeamStore.getState();

      if (!currTeamId) {
        console.error('유효한 팀 ID가 없어 네비게이션에 실패했습니다.');
        return;
      }

      navigate(pathFunction(Number(currTeamId)));
    },
    [navigate],
  );

  return teamNavigate;
};
