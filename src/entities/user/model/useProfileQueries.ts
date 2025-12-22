import { useQuery } from '@tanstack/react-query';
import { User } from '@/entities/user/user.types';
import apiRequest from '@/shared/api/apiRequest';
import { useTeamStore } from '@/shared/model/store/teamStore';
import { APIResponse } from '@/shared/types/api.types';

// 프로필 조회
export const useGetProfile = () => {
  const teamId = useTeamStore((state) => state.teamId);

  return useQuery<APIResponse<User>, Error, User>({
    queryKey: ['user', 'profile', teamId],
    queryFn: async () => {
      return await apiRequest({
        url: '/api/v2/member',
        method: 'GET',
      });
    },
    staleTime: 60 * 1000 * 20,
    select: (res) => res.result,
  });
};
