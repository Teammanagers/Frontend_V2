import { ScheduleDto } from '@/entities/management/model/ScheduleDto.ts';

export interface TeamTag {
  id: number;
  name: string;
}

export interface TeamInfoProps {
  id: number;
  title: string;
  imageUrl: string | null;
  teamCode: string;
  tagList: TeamTag[];
  onTeamNameChange: (newName: string) => void;
  refreshTeamData: () => void;
}

export interface ShowScheduleProps {
  schedule: ScheduleDto;
}

export interface TimeSlot {
  start: string; // "HH:mm"
  end: string; // "HH:mm"
}

export interface IScheduleDto {
  dayOfWeek: string;
  timeRangeDto: {
    startTime: string;
    endTime: string;
  };
}

export interface ScheduleProps {
  schedule: {
    [day: string]: { value: TimeSlot[] };
  };
}

export interface TimeSelectorProps {
  day: string;
  times: TimeSlot[];
  onChange: (day: string, times: TimeSlot[]) => void;
}
