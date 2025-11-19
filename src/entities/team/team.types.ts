import { Team, TeamTag } from '@/shared/types/team.types';

interface TeamResponse {
  team: Team;
  imgUrl: string;
  teamTagList: TeamTag[];
}

export type { TeamResponse };
