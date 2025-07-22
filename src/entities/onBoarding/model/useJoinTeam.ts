import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import apiRequest from '@/shared/api/apiRequest';

export default function useJoinTeam() {
  const [teamJoinPassword, setTeamJoinPassword] = useState<string>('');
  const [showHelperMessage, setShowHelperMessage] = useState<boolean>(false);

  const useGetTeamByCode = (code: number, options?: { enabled?: boolean }) => {
    return useQuery({
      queryKey: [code, 'getTeam'],
      queryFn: async () => {
        const data = await apiRequest({
          url: `/team/by-code?teamCode=${code}`,
          method: 'GET',
        });
        return data;
      },
      enabled: options?.enabled ?? true,
    });
  };

  const useJoinTeamMutation = useMutation({
    mutationFn: async ({ teamId }: { teamId: number }) => {
      const data = await apiRequest({
        url: `/team/${teamId}/join`,
        method: 'POST',
        data: { password: teamJoinPassword },
      });
      return data;
    },
    onError: () => {
      setShowHelperMessage(true);
    },
  });

  return {
    useGetTeamByCode,
    useJoinTeamMutation,
    teamJoinPassword,
    setTeamJoinPassword,
    showHelperMessage,
    setShowHelperMessage,
  };
}
