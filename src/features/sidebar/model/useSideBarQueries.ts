import { useQuery } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest.ts';
import { Team, TeamTag } from '@/shared/types/team.types.ts';

interface IMyTeamResponse {
  team: Team;
  imgUrl: string;
  teamTagList: TeamTag[];
}

export default function useSideBarQueries() {
  const useMyTeamListQuery = () => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['sidebar', 'myTeamList'],
      queryFn: async () =>
        apiRequest({
          url: `/api/v2/team/list`,
          method: 'GET',
        }),
      select: (res): IMyTeamResponse[] => res.result,
      staleTime: 60 * 1000,
    });
    return { isPending, isError, isSuccess, data };
  };

  return { useMyTeamListQuery };
}
