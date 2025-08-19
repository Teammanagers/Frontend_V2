import { useQuery } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest';

interface NameResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    name: string;
  };
}

export const useGetName = () => {
  const { data } = useQuery<NameResponse>({
    queryKey: ['userName'],
    queryFn: async () => {
      const response = await apiRequest({
        url: '/api/v2/member/name',
        method: 'GET',
      });
      return response;
    },
    staleTime: 0,
    gcTime: 0,
  });

  return { name: data?.result?.name };
};
