import { useMutation } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest.ts';
import { queryClient } from '@/shared/config/queryClient.ts';

export const TEAM_ID = 6;

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
        console.log('팀 나가기 성공');
        queryClient.invalidateQueries({
          queryKey: ['end', 'team', TEAM_ID],
        });
      },
    });
    return { mutate, data, isPending, isError, isSuccess };
  };
  return { useWithdrawTeamMutation };
}
