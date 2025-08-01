import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import apiRequest from '@/shared/api/apiRequest';

export default function useJoinTeam() {
  const [teamJoinPassword, setTeamJoinPassword] = useState<string>('');
  const [showHelperMessage, setShowHelperMessage] = useState<boolean>(false);

  const useSearchTeamMutation = useMutation({
    mutationFn: async (code: string) => {
      const data = await apiRequest({
        url: `/api/v2/team/by-code?teamCode=${code}`,
        method: 'GET',
      });
      return data;
    },
    retry: false,
  });

  const useJoinTeamMutation = useMutation({
    mutationFn: async ({ teamId }: { teamId: string }) => {
      const data = await apiRequest({
        url: `/api/v2/team/${teamId}/join`,
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
    useSearchTeamMutation,
    useJoinTeamMutation,
    teamJoinPassword,
    setTeamJoinPassword,
    showHelperMessage,
    setShowHelperMessage,
  };
}
