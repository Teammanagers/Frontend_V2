import { useMutation, useQuery } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest';

export interface JoinTeamParams {
  teamId: string;
  password: string;
}

export default function useJoinTeam() {
  const useGetTeamByCode = (code: string) => {
    return useQuery({
      queryKey: [code, 'getTeam'],
      queryFn: async () => {
        const data = await apiRequest({
          url: `/team/by-code?teamCode=${code}`,
          method: 'GET',
        });
        return data;
      },
    });
  };
  const useJoinTeamMutation = () => {
    return useMutation({
      mutationFn: async ({ teamId, password }: JoinTeamParams) => {
        const data = await apiRequest({
          url: `/team/${teamId}/join`,
          method: 'POST',
          data: { password },
        });
        return data;
      },
    });
  };
  return { useGetTeamByCode, useJoinTeamMutation };
}
