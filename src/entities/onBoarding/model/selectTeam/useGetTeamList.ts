import { useQuery } from '@tanstack/react-query';
import apiRequest from '@/shared/api/apiRequest';

// UI에서 사용할 타입
export interface TeamInfo {
  id: number;
  img: string;
  title: string;
  tags: string[];
}

// API 응답 타입
interface TeamTag {
  id: number;
  name: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  useYn: string;
}

interface Team {
  id: number;
  title: string;
  password: string;
  code: string;
  rootFolderId: number;
  timeSlotId: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  useYn: string;
}

interface TeamWithDetails {
  team: Team;
  imgUrl: string;
  teamTagList: TeamTag[];
}

interface ApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: TeamWithDetails[];
}

export const useGetTeamList = () => {
  const teamListQuery = useQuery<ApiResponse>({
    queryKey: ['teamList'],
    queryFn: async () => {
      const response = await apiRequest({
        url: '/api/v2/team/list',
        method: 'GET',
      });
      return response;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
  });

  const transformedTeamList: TeamInfo[] =
    teamListQuery.data?.result?.map((item) => ({
      id: item.team.id,
      title: item.team.title,
      img: item.imgUrl,
      tags: item.teamTagList.map((tag) => tag.name),
    })) || [];

  return {
    teamList: transformedTeamList,
    isLoading: teamListQuery.isLoading,
    error: teamListQuery.error,
  };
};
