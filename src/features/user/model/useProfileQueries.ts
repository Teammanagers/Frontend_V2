import { User } from '@/entities/user/model/user.types';
import apiRequest from '@/shared/api/apiRequest';
import { APIResponse } from '@/shared/types/api.types';
import { useQuery } from '@tanstack/react-query';

// 프로필 조회
export const useGetProfile = () => {
  return useQuery<APIResponse<User>, Error, User>({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      return await apiRequest({
        url: '/api/v2/member',
        method: 'GET',
      });
    },
    select: (res) => res.result,
  });
};
