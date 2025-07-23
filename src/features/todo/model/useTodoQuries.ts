import apiRequest from '@/shared/api/apiRequest';
import { queryClient } from '@/shared/config/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function useTodoQuries(TEAM_ID: number) {
  // 팀 투두 조회
  const useTeamTodoQuery = () => {
    const { isPending, isError, error, isSuccess, data } = useQuery({
      queryKey: ['teamTodo', TEAM_ID],
      queryFn: async () => {
        return await apiRequest({
          url: `/api/v2/todo?teamId=${TEAM_ID}`,
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
    }, [isError, isSuccess, data]);

    return { isPending, isError, isSuccess, data };
  };

  // 투두 생성
  const useCreateTodoMutation = (teamMemberId: number) => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (data: { title: string }) => {
        await apiRequest({
          url: `/api/v2/todo?teamMemberId=${teamMemberId}`,
          method: 'POST',
          data,
        });
      },
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ['teamTodo', TEAM_ID],
        });
        queryClient.refetchQueries({
          queryKey: ['teamTodo', TEAM_ID],
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
          queryKey: ['teamTodo', TEAM_ID],
        });
        queryClient.refetchQueries({
          queryKey: ['teamTodo', TEAM_ID],
        });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  return { useTeamTodoQuery, useCreateTodoMutation, useDeleteTodoMutation };
}
