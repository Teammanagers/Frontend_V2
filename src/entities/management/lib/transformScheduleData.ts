import {
  IScheduleDto,
  TimeSlot,
  Weekday,
} from '@/entities/management/management.types';

const DAY_MAP: Record<string, Weekday> = {
  MON: 'Monday',
  TUE: 'Tuesday',
  WED: 'Wednesday',
  THU: 'Thursday',
  FRI: 'Friday',
  SAT: 'Saturday',
  SUN: 'Sunday',
};

export const transformScheduleData = (data: IScheduleDto[]) => {
  const result: Partial<Record<Weekday, { value: TimeSlot[] }>> = {
    Monday: { value: [] },
    Tuesday: { value: [] },
    Wednesday: { value: [] },
    Thursday: { value: [] },
    Friday: { value: [] },
    Saturday: { value: [] },
    Sunday: { value: [] },
  };

  data.forEach((item) => {
    const day = DAY_MAP[item.dayOfWeek];
    if (!day) return;

    const start = item.timeRangeDto.startTime.slice(0, 5);
    const end = item.timeRangeDto.endTime.slice(0, 5);

    result[day]!.value.push({ start, end });
  });

  return result;
};
