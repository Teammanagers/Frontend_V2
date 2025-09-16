import { useQuery } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest.ts';
import { Team, TeamTag } from '@/shared/types/team.types.ts';

const TEAM_ID = 1;

interface ITeamResponse {
  team: Team;
  imgUrl: string;
  teamTagList: TeamTag[];
}

export default function useTeamQueries() {
  const useTeamByIdQueries = () => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['management', 'team', TEAM_ID],
      queryFn: () =>
        apiRequest({
          url: `/api/v2/team/${TEAM_ID}`,
          method: 'GET',
        }),
      select: (res): ITeamResponse => res.result,
      staleTime: 60 * 1000,
    });

    return { isPending, isError, isSuccess, data };
  };

  return { useTeamByIdQueries };
}
