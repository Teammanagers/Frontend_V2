export interface ScheduleDto {
  [day: string]: { value: string[] };
}
export interface TimeSlot {
  start: string;
  end: string;
}
