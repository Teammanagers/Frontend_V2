import apiRequest from '@/shared/api/apiRequest';
import { TEAM_ID } from '@/shared/config/constants/team.constants';
import { queryClient } from '@/shared/config/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Event, FetchEventResponse } from '../calendar.types';
import { QueryResponse } from '@/shared/types/api.types';
import { useEffect } from 'react';

export default function useEventQueries(yearMonth: string) {
  // 캘린더 일정 조회
  const useEventQuery = (): QueryResponse & {
    data: FetchEventResponse[];
  } => {
    const { isPending, isError, error, isSuccess, data } = useQuery({
      queryKey: ['event', yearMonth],
      enabled: !!yearMonth,
      queryFn: async () => {
        return await apiRequest({
          url: `/api/v2/calendar/list?teamId=${TEAM_ID}&yearMonth=${yearMonth}`,
          method: 'GET',
        });
      },
      staleTime: 60 * 1000 * 5, // 5분
      select: (data) => data.result,
    });

    useEffect(() => {
      if (isError) {
        console.error(`${yearMonth} 일정 조회 실패`, error);
      }
    }, [isError, isSuccess, data]);

    return { isPending, isError, isSuccess, data };
  };

  // 캘린더 일정 생성
  const useCreateEventMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (data: Event) => {
        return await apiRequest({
          url: `/api/v2/calendar/${TEAM_ID}`,
          method: 'POST',
          data,
        });
      },
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ['event', yearMonth],
        });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  // 캘린더 일정 삭제
  const useDeleteEventMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async ({
        data,
        planId,
      }: {
        data: Omit<Event, 'date'> & { planId: number };
        planId: string;
      }) => {
        return await apiRequest({
          url: `/api/v2/calendar/${planId}`,
          method: 'DELETE',
          data,
        });
      },
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ['event', yearMonth],
        });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  return { useEventQuery, useCreateEventMutation, useDeleteEventMutation };
}
