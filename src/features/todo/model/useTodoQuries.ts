import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { queryClient } from '@/app/provider/queryClient';
import apiRequest from '@/shared/api/apiRequest';
import { useTeamStore } from '@/shared/model/store/teamStore';

export default function useTodoQuries() {
  const teamId = useTeamStore((state) => state.teamId);

  // 팀 투두 조회
  const useTeamTodoQuery = () => {
    const { isPending, isError, error, isSuccess, data } = useQuery({
      queryKey: ['teamTodo', teamId],
      queryFn: async () => {
        return await apiRequest({
          url: `/api/v2/todo?teamId=${teamId}`,
          method: 'GET',
        });
      },
      staleTime: 60 * 1000 * 10, // 10분
      select: (data) => data.result,
    });

    useEffect(() => {
      if (isError) {
        console.error(`팀 투두 조회 실패`, error);
      }
    }, [isError, isSuccess, data, error]);

    return { isPending, isError, isSuccess, data };
  };

  // 투두 생성
  const useCreateTodoMutation = (teamMemberId: number) => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (data: { title: string }) => {
        await apiRequest({
          url: `/api/v2/todo?teamId=${teamMemberId}`,
          method: 'POST',
          data,
        });
      },
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ['teamTodo', teamId],
        });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  // 투두 내용 수정
  const useEditTodoMutation = (todoId: number) => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (data: { title: string }) => {
        await apiRequest({
          url: `/api/v2/todo/${todoId}`,
          method: 'POST',
          data,
        });
      },
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ['teamTodo', teamId],
        });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  // 투두 삭제
  const useDeleteTodoMutation = (todoId: number) => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async () => {
        await apiRequest({
          url: `/api/v2/todo/${todoId}`,
          method: 'DELETE',
        });
      },
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ['teamTodo', teamId],
        });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  // 투두 상태 수정 삭제
  const useEditTodoStatusMutation = (todoId: number) => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (option: number) => {
        await apiRequest({
          url: `/api/v2/todo/${todoId}?option=${option}`,
          method: 'PATCH',
        });
      },
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ['teamTodo', teamId],
        });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  return {
    useTeamTodoQuery,
    useCreateTodoMutation,
    useEditTodoMutation,
    useDeleteTodoMutation,
    useEditTodoStatusMutation,
  };
}
