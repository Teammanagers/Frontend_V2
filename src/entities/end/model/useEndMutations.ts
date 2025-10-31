import { useMutation } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest.ts';
import { queryClient } from '@/shared/config/queryClient.ts';

export const TEAM_ID = 7;

export default function useEndMutations() {
  // 팀 제거 (팀 나가기) - 팀원
  const useWithdrawTeamMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async () => {
        return await apiRequest({
          url: `/api/v2/team/${TEAM_ID}/withdrawal`,
          method: 'DELETE',
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['end', 'team', TEAM_ID],
        });
      },
    });
    return { mutate, data, isPending, isError, isSuccess };
  };

  // 팀 종료 (리더)
  const useCompleteTeamMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async () => {
        return await apiRequest({
          url: `/api/v2/team/${TEAM_ID}/complete`,
          method: 'PATCH',
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['end', 'team', TEAM_ID],
        });
      },
    });
    return { mutate, data, isPending, isError, isSuccess };
  };
  return { useWithdrawTeamMutation, useCompleteTeamMutation };
}
