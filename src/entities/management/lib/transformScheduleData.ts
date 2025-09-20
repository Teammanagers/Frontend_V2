import {
  IScheduleDto,
  TimeSlot,
} from '@/entities/management/management.types.ts';

export const transformScheduleData = (
  schedules: IScheduleDto[],
): {
  [day: string]: { value: TimeSlot[] };
} => {
  const result: { [day: string]: { value: TimeSlot[] } } = {};

  schedules.forEach(({ dayOfWeek, timeRangeDto }) => {
    if (!result[dayOfWeek]) {
      result[dayOfWeek] = { value: [] };
    }

    result[dayOfWeek].value.push({
      start: timeRangeDto.startTime.slice(0, 5),
      end: timeRangeDto.endTime.slice(0, 5),
    });
  });

  return result;
};
