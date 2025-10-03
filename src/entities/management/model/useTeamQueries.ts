import { useQuery } from '@tanstack/react-query';
import { IScheduleDto } from '@/entities/management/management.types.ts';
import apiRequest from '@/shared/api/apiRequest.ts';
import { IMemberResponse } from '@/shared/types/member.types.ts';
import { Team, TeamTag } from '@/shared/types/team.types.ts';

export const TEAM_ID = 3;

interface ITeamResponse {
  team: Team;
  imgUrl: string;
  teamTagList: TeamTag[];
}

interface IScheduleResponse {
  scheduleDto: IScheduleDto;
}

export default function useTeamQueries() {
  // 팀 정보 조회 (팀 아이디)
  const useTeamByIdQuery = () => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['management', 'team', TEAM_ID],
      queryFn: () =>
        apiRequest({
          url: `/api/v2/team/${TEAM_ID}`,
          method: 'GET',
        }),
      select: (res): ITeamResponse => res.result,
      staleTime: 60 * 1000,
    });

    return { isPending, isError, isSuccess, data };
  };

  // 팀 스케줄 조회
  const useTeamScheduleQuery = () => {
    const { isPending, isError, isSuccess, data } = useQuery({
      queryKey: ['management', 'schedule', TEAM_ID],
      queryFn: () =>
        apiRequest({
          url: `/api/v2/schedule/teams/${TEAM_ID}`,
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
      queryKey: ['management', 'member', TEAM_ID],
      queryFn: () =>
        apiRequest({
          url: `/api/v2/team/${TEAM_ID}/member-list`,
          method: 'GET',
        }),
      select: (res): IMemberResponse[] => res.result,
      staleTime: 60 * 1000,
    });
    return { isPending, isError, isSuccess, data };
  };

  return { useTeamByIdQuery, useTeamScheduleQuery, useTeamMemberQuery };
}
