import { Team, TeamTag } from '@/shared/types/team.types.ts';

interface TeamResponse {
  team: Team;
  imgUrl: string;
  teamTagList: TeamTag[];
}

export type { TeamResponse };
