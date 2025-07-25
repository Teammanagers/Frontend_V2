import { useMutation } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest';
import { TeamTag } from '@/shared/types/tag.types';

interface createTeamMutationProps {
  title: string;
  teamCode: string;
  teamTagList: TeamTag[];
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
      const makeTeamResponse = await apiRequest({
        url: '/team',
        method: 'POST',
        data: { title, teamCode, teamTagList, password },
      });
      return makeTeamResponse;
    },
    onError: () => {},
    onSuccess: () => {},
  });
  return { createTeamMutation };
};
