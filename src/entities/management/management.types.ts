export interface TeamTag {
  id: number;
  name: string;
}

export interface TeamInfoProps {
  title: string;
  imageUrl: string | null;
  teamCode: string;
  tagList: TeamTag[];
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface IScheduleDto {
  dayOfWeek: string;
  timeRangeDto: {
    startTime: string;
    endTime: string;
  };
}

export type Weekday =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface ScheduleProps {
  schedule: Partial<Record<Weekday, { value: TimeSlot[] }>>;
  mySchedule?: Partial<Record<Weekday, { value: TimeSlot[] }>>;
  partialSchedule?: Partial<Record<Weekday, { value: TimeSlot[] }>>;
}

export interface TimeSelectorProps {
  day: Weekday;
  times: TimeSlot[];
  onChange: (day: Weekday, times: TimeSlot[]) => void;
}
