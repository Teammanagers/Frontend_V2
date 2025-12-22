import { useQuery } from '@tanstack/react-query';
import {
  Resource,
  ResourceListResponse,
} from '@/entities/resource/resource.types';
import apiRequest from '@/shared/api/apiRequest';
import { useTeamStore } from '@/shared/model/store/teamStore';
import { APIResponse } from '@/shared/types/api.types';

/* 팀 자료 조회 */
export const useGetResourceList = () => {
  const teamId = useTeamStore((state) => state.teamId);

  const queryResult = useQuery<
    APIResponse<ResourceListResponse>,
    Error,
    Resource[]
  >({
    queryKey: ['resource', 'list', teamId],
    queryFn: async () => {
      return await apiRequest({
        url: `/api/v2/data/${teamId}`,
        method: 'GET',
      });
    },
    staleTime: 60 * 1000 * 5, // 5분
    select: (data) => data.result.dataList,
  });

  return queryResult;
};
