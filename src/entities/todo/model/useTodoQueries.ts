import { useQuery } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest';
import { useTeamStore } from '@/shared/model/store/teamStore';
import { MemberTodos } from '../todo.type';

// 내 투두 조회
export const useMyTodoList = () => {
  const teamId = useTeamStore((state) => state.teamId);

  const { isPending, isError, isSuccess, data } = useQuery({
    queryKey: ['my-todo', teamId],
    queryFn: () =>
      apiRequest({
        url: `/api/v2/todo/my?teamId=${teamId}`,
        method: 'GET',
      }),
    select: (res): MemberTodos => res.result,
    staleTime: 60 * 1000 * 5,
    enabled: !!teamId,
  });

  return { isPending, isError, isSuccess, data };
};
