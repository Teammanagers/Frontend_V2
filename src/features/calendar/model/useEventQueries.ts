import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { queryClient } from '@/app/provider/queryClient';
import {
  CalendarEvent,
  FetchEventResponse,
} from '@/entities/calendar/calendar.types';
import apiRequest from '@/shared/api/apiRequest';
import { useTeamStore } from '@/shared/model/store/teamStore';
import { QueryResponse } from '@/shared/types/api.types';

export default function useEventQueries(yearMonth?: string) {
  const { teamId } = useTeamStore.getState();

  // 다가오는 일정 조회
  const useUpcomingEventQuery = (): QueryResponse & {
    data: FetchEventResponse[];
  } => {
    const { isPending, isError, error, isSuccess, data } = useQuery({
      queryKey: ['event', 'upcoming'],
      queryFn: async () => {
        return await apiRequest({
          url: `/api/v2/calendar/upcoming?teamId=${teamId}`,
          method: 'GET',
        });
      },
      staleTime: 60 * 1000 * 10, // 10분
      select: (data) => data.result,
    });

    useEffect(() => {
      if (isError) {
        console.error(`다가오는 일정 조회 실패`, error);
      }
    }, [isError, isSuccess, data, error]);

    return { isPending, isError, isSuccess, data };
  };

  // 캘린더 일정 조회
  const useEventQuery = (): QueryResponse & {
    data: FetchEventResponse[];
  } => {
    const { isPending, isError, error, isSuccess, data } = useQuery({
      queryKey: ['event', yearMonth],
      enabled: !!yearMonth,
      queryFn: async () => {
        return await apiRequest({
          url: `/api/v2/calendar/list?teamId=${teamId}&yearMonth=${yearMonth}`,
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
    }, [isError, isSuccess, data, error]);

    return { isPending, isError, isSuccess, data };
  };

  // 캘린더 일정 생성
  const useCreateEventMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (data: CalendarEvent) => {
        await apiRequest({
          url: `/api/v2/calendar/${teamId}`,
          method: 'POST',
          data,
        });
      },
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ['event', yearMonth],
        });
        queryClient.refetchQueries({
          queryKey: ['event', 'upcoming'],
        });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  // 캘린더 일정 수정
  const useEditEventMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (
        data: Omit<CalendarEvent, 'date'> & { planId: number },
      ) => {
        await apiRequest({
          url: `/api/v2/calendar/${data.planId}`,
          method: 'PATCH',
          data,
        });
      },
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ['event', yearMonth],
        });
        queryClient.refetchQueries({
          queryKey: ['event', 'upcoming'],
        });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  // 캘린더 일정 삭제
  const useDeleteEventMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (
        data: Omit<CalendarEvent, 'date'> & { planId: number },
      ) => {
        await apiRequest({
          url: `/api/v2/calendar/${data.planId}`,
          method: 'DELETE',
          data,
        });
      },
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ['event', yearMonth],
        });
        queryClient.refetchQueries({
          queryKey: ['event', 'upcoming'],
        });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  return {
    useUpcomingEventQuery,
    useEventQuery,
    useCreateEventMutation,
    useEditEventMutation,
    useDeleteEventMutation,
  };
}
