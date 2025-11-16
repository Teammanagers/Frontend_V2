import { useQuery } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest';
import { useTeamStore } from '@/shared/model/store/teamStore';
import { TeamResponse } from '../team.types';

// 팀 아이디로 팀 정보 조회
export const useTeamById = () => {
  const teamId = useTeamStore((state) => state.teamId);

  const { isPending, isError, isSuccess, data } = useQuery({
    queryKey: ['team', teamId],
    queryFn: () =>
      apiRequest({
        url: `/api/v2/team/${teamId}`,
        method: 'GET',
      }),
    select: (res): TeamResponse => res.result,
    staleTime: 60 * 1000,
  });

  return { isPending, isError, isSuccess, data };
};
