import { useMutation } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest';

interface createTeamMutationProps {
  title: string;
  teamCode: string;
  teamTagList: string[];
  password: string;
}

export const useCreateTeam = () => {
  const createTeamMutation = useMutation({
    mutationFn: async ({
      title,
      teamCode,
      teamTagList,
      password,
    }: createTeamMutationProps) => {
      const data = await apiRequest({
        url: '/team',
        method: 'POST',
        data: { title, teamCode, teamTagList, password },
      });
      return data;
    },
    onError: () => {},
    onSuccess: () => {},
  });
  return { createTeamMutation };
};
