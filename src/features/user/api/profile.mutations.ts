import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/app/provider/queryClient';
import apiRequest from '@/shared/api/apiRequest';
import { useTeamStore } from '@/shared/model/store/teamStore';
import { ProfileFormValues } from '../model/profile.schema';

export const useUpdateProfileMutation = () => {
  const teamId = useTeamStore((state) => state.teamId);

  return useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      await apiRequest({
        url: '/api/v2/member',
        method: 'POST',
        data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile', teamId] });
    },
  });
};
