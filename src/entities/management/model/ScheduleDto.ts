// 스케줄 DTO
export interface ScheduleDto {
  monday: { value: string[] };
  tuesday: { value: string[] };
  wednesday: { value: string[] };
  thursday: { value: string[] };
  friday: { value: string[] };
  saturday: { value: string[] };
  sunday: { value: string[] };
}

// 화면에 보이는 시간 슬롯
export interface ScheduleDto {
  [day: string]: { value: string[] };
}
export interface TimeSlot {
  start: string;
  end: string;
}
