import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/app/provider/queryClient';
import {
  ICreateMemberTagInput,
  IDeleteMemberTag,
  IEditMemberTagInput,
  IRegisterScheduleInput,
  ITeamTagInput,
  IUseTeamMutations,
} from '@/entities/management/model/teamMutations.types.ts';
import apiRequest from '@/shared/api/apiRequest.ts';
import { useTeamStore } from '@/shared/model/store/teamStore.ts';

export default function useTeamMutations() {
  const teamId = useTeamStore((state) => state.teamId);

  // 팀 수정
  const useEditTeamMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async ({ title, imageFile }: IUseTeamMutations) => {
        const formData = new FormData();
        formData.append('updateTeam', JSON.stringify({ title }));
        if (imageFile) formData.append('imageFile', imageFile);

        return await apiRequest({
          url: `/api/v2/team/${teamId}`,
          method: 'PATCH',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['team', teamId],
        });
        queryClient.invalidateQueries({ queryKey: ['sidebar', 'myTeamList'] });
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
          url: `/api/v2/tag/team/${teamId}`,
          method: 'POST',
          data: { tagName },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['management', 'team', 'tag', teamId],
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
          url: `/api/v2/tag/${tagId}/team/${teamId}`,
          method: 'DELETE',
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['management', 'team', 'tag', teamId],
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
          url: `/api/v2/tag/${tagId}/team/${teamId}`,
          method: 'PATCH',
          data: { tagName },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['management', 'team', 'tag', teamId],
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
          url: `/api/v2/tag/team/${teamId}/member/${memberId}`,
          method: 'POST',
          data: { tagName },
        });
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ['management', 'teamMember', 'tag', variables.memberId],
        });
      },
    });
    return { mutate, data, isPending, isError, isSuccess };
  };

  // 팀원 태그 수정
  const useEditMemberTagMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async ({ tagId, memberId, tagName }: IEditMemberTagInput) => {
        return await apiRequest({
          url: `/api/v2/tag/${tagId}/team/${teamId}/member/${memberId}`,
          method: 'PATCH',
          data: { tagName },
        });
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ['management', 'teamMember', 'tag', variables.memberId],
        });
      },
    });
    return { mutate, data, isPending, isError, isSuccess };
  };

  // 팀원 태그 삭제
  const useDeleteMemberTagMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async ({ memberId, tagId }: IDeleteMemberTag) => {
        return await apiRequest({
          url: `/api/v2/tag/${tagId}/team/${teamId}/member/${memberId}`,
          method: 'DELETE',
        });
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ['management', 'teamMember', 'tag', variables.memberId],
        });
      },
    });
    return { mutate, data, isPending, isError, isSuccess };
  };

  // 스케줄 등록 및 수정
  const useRegisterScheduleMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async ({ times }: IRegisterScheduleInput) => {
        return await apiRequest({
          url: `/api/v2/schedule/teams/${teamId}`,
          method: 'POST',
          data: { times },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['management', 'schedule', teamId],
        });
        queryClient.invalidateQueries({
          queryKey: ['management', 'mySchedule', teamId],
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
    useEditMemberTagMutation,
    useDeleteMemberTagMutation,
    useRegisterScheduleMutation,
  };
}
