import { Team, TeamTag } from '@/shared/types/team.types';

interface TeamResponse {
  team: Team;
  imgUrl: string;
  teamTagList: TeamTag[];
}

interface TeamMember {
  teamMemberId: number;
  member: {
    id: number;
    name: string;
    birth: string | null;
    email: string | null;
    telNum: string | null;
    belong: string | null;
    providerInfo: {
      provider: string;
      providerId: string;
    };
    role: string;
    createdAt: string;
    updatedAt: string;
    useYn: string;
  };
  imgUrl: string | null;
  grantedRoleList: string[];
}

interface TeamMemberResponse {
  leader: TeamMember;
  members: TeamMember[];
}

export type { TeamResponse, TeamMemberResponse };
