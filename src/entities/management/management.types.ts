import { ScheduleDto } from '@/entities/management/model/ScheduleDto.ts';

export interface TeamTag {
  id: number;
  name: string;
}
export interface TeamData {
  id: number;
  title: string;
  imageUrl?: string;
  teamCode?: string;
  tagList?: TeamTag[];
}

export interface TeamInfoProps extends TeamData {
  onTeamNameChange?: (newName: string) => void;
  refreshTeamData?: () => void;
}

export interface ShowScheduleProps {
  schedule: ScheduleDto;
}
