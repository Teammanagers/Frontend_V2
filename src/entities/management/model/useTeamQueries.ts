import { useQuery } from '@tanstack/react-query';
import { IScheduleDto } from '@/entities/management/management.types.ts';
import apiRequest from '@/shared/api/apiRequest.ts';
import { useTeamStore } from '@/shared/model/store/teamStore.ts';
import { ITeamMemberResponse } from '@/shared/types/member.types.ts';

interface IScheduleResponse {
  scheduleDto: IScheduleDto;
}

export default function useTeamQueries() {
  const teamId = useTeamStore((state) => state.teamId);

  // 팀 스케줄 부분 조회 (팀 스케줄 조회)
  const usePartialScheduleQuery = (teamMemberIds: number[]) => {
    const enabled = teamMemberIds.length > 0;
    const sortedIds = [...teamMemberIds].sort((a, b) => a - b);

    const { isPending, isError, isSuccess, isFetching, data } = useQuery({
      queryKey: ['management', 'schedule', teamId, sortedIds],
      queryFn: () => {
        const queryString = sortedIds
          .map((id) => `teamMemberId=${encodeURIComponent(id)}`)
          .join('&');
        const url = `/api/v2/schedule/teams/${teamId}/partial?${queryString}`;
        return apiRequest({
          url,
          method: 'GET',
        });
      },
      select: (res): IScheduleDto[] =>
        res.result.map((r: IScheduleResponse) => r.scheduleDto),
      enabled,
      staleTime: 60 * 1000,
    });
    return { isPending, isError, isSuccess, isFetching, data };
  };

  // 개인 스케줄 조회
  const useMyScheduleQuery = () => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['management', 'mySchedule', teamId],
      queryFn: () =>
        apiRequest({
          url: `/api/v2/schedule/teams/${teamId}/my-schedules`,
          method: 'GET',
        }),
      select: (res): IScheduleDto[] =>
        res.result.map((r: IScheduleResponse) => r.scheduleDto),
      staleTime: 60 * 1000,
    });
    return { isPending, isError, isSuccess, data };
  };

  // 팀 멤버 조회
  const useTeamMemberQuery = () => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['management', 'member', teamId],
      queryFn: () =>
        apiRequest({
          url: `/api/v2/team/${teamId}/member-list`,
          method: 'GET',
        }),
      select: (res): ITeamMemberResponse => res.result,
      staleTime: 60 * 1000,
    });
    return { isPending, isError, isSuccess, data };
  };

  return {
    usePartialScheduleQuery,
    useMyScheduleQuery,
    useTeamMemberQuery,
  };
}
