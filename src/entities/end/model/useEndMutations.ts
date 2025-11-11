import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/app/provider/queryClient';
import apiRequest from '@/shared/api/apiRequest.ts';
import { useTeamStore } from '@/shared/model/store/teamStore.ts';

export default function useEndMutations() {
  const teamId = useTeamStore((state) => state.teamId);

  // 팀 제거 (팀 나가기) - 팀원
  const useWithdrawTeamMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async () => {
        return await apiRequest({
          url: `/api/v2/team/${teamId}/withdrawal`,
          method: 'DELETE',
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['end', 'team', teamId],
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
          url: `/api/v2/team/${teamId}/complete`,
          method: 'PATCH',
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['end', 'team', teamId],
        });
      },
    });
    return { mutate, data, isPending, isError, isSuccess };
  };
  return { useWithdrawTeamMutation, useCompleteTeamMutation };
}
