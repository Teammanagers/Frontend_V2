import {
  IScheduleDto,
  TimeSlot,
  Weekday,
} from '@/entities/management/management.types';
import { IDaySchedule } from '@/entities/management/model/useTeamMutations.ts';

/* ----------------------------- 조회용 변환 ----------------------------- */

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

/* ----------------------------- 서버 전송용 변환 ----------------------------- */

const REVERSE_DAY_MAP: Record<Weekday, string> = {
  Monday: 'MON',
  Tuesday: 'TUE',
  Wednesday: 'WED',
  Thursday: 'THU',
  Friday: 'FRI',
  Saturday: 'SAT',
  Sunday: 'SUN',
};

export const transformScheduleRequest = (
  weeklyTimes: Record<Weekday, TimeSlot[]>,
) => {
  const times = (Object.keys(REVERSE_DAY_MAP) as Weekday[])
    .map((day) => {
      const timeSlots = weeklyTimes[day];
      if (!timeSlots || timeSlots.length === 0) return null;

      return {
        dayOfWeek: REVERSE_DAY_MAP[day] as
          | 'MON'
          | 'TUE'
          | 'WED'
          | 'THU'
          | 'FRI'
          | 'SAT'
          | 'SUN',
        timeRanges: timeSlots.map((slot) => {
          const [startHour, startMinute] = slot.start.split(':').map(Number);
          const [endHour, endMinute] = slot.end.split(':').map(Number);
          return { startHour, startMinute, endHour, endMinute };
        }),
      };
    })
    .filter(Boolean) as IDaySchedule[]; // null 제거

  return { times };
};
