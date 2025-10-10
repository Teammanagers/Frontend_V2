import { useMutation } from '@tanstack/react-query';
import { TEAM_ID } from '@/entities/management/model/useTeamQueries.ts';
import apiRequest from '@/shared/api/apiRequest.ts';
import { queryClient } from '@/shared/config/queryClient.ts';

interface IUseTeamMutations {
  title: string;
  imageFile: File | null;
}

interface ITeamTagInput {
  tagId: number;
  tagName: string;
}

interface ICreateMemberTagInput {
  memberId: number;
  tagName: string;
}

export default function useTeamMutations() {
  // 팀 수정
  const useEditTeamMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async ({ title, imageFile }: IUseTeamMutations) => {
        const formData = new FormData();
        formData.append('updateTeam', JSON.stringify({ title }));
        if (imageFile) formData.append('imageFile', imageFile);

        return await apiRequest({
          url: `/api/v2/team/${TEAM_ID}`,
          method: 'PATCH',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['management', 'team', TEAM_ID],
        });
        console.log('이미지 변경!');
      },
      onError: (err) => console.error(err),
    });
    return { mutate, data, isPending, isError, isSuccess };
  };

  // 팀 태그 생성
  const useCreateTeamTagMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async ({ tagName }: { tagName: string }) => {
        return await apiRequest({
          url: `/api/v2/tag/team/${TEAM_ID}`,
          method: 'POST',
          data: { tagName },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['management', 'team', 'tag', TEAM_ID],
        });
      },
      onError: (err) => console.error(err),
    });
    return { mutate, data, isPending, isError, isSuccess };
  };

  // 팀 태그 삭제
  const useDeleteTeamTagMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (tagId: number) => {
        await apiRequest({
          url: `/api/v2/tag/${tagId}/team/${TEAM_ID}`,
          method: 'DELETE',
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['management', 'team', 'tag', TEAM_ID],
        });
      },
    });
    return { mutate, data, isPending, isError, isSuccess };
  };

  // 팀 태그 수정
  const useEditTeamTagMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async ({ tagId, tagName }: ITeamTagInput) => {
        await apiRequest({
          url: `/api/v2/tag/${tagId}/team/${TEAM_ID}`,
          method: 'PATCH',
          data: { tagName },
        });
      },
      onSuccess: () => {
        console.log('태그 수정 완^^');
        queryClient.invalidateQueries({
          queryKey: ['management', 'team', 'tag', TEAM_ID],
        });
      },
    });
    return { mutate, data, isPending, isError, isSuccess };
  };

  // 팀원 태그 생성
  const useCreateMemberTagMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async ({ memberId, tagName }: ICreateMemberTagInput) => {
        return await apiRequest({
          url: `/api/v2/tag/team/${TEAM_ID}/member/${memberId}`,
          method: 'POST',
          data: { tagName },
        });
      },
      onSuccess: (_, variables) => {
        console.log('팀원 태그 생성!', variables.tagName);
        queryClient.invalidateQueries({
          queryKey: ['management', 'teamMember', 'tag', variables.memberId],
        });
      },
    });
    return { mutate, data, isPending, isError, isSuccess };
  };

  return {
    useEditTeamMutation,
    useCreateTeamTagMutation,
    useDeleteTeamTagMutation,
    useEditTeamTagMutation,
    useCreateMemberTagMutation,
  };
}
