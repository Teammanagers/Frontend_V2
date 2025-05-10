import { ScheduleDto } from '@/entities/management/model/ScheduleDto.ts';

function makeBlankDay(): string[] {
  return Array(24 * 2).fill('0');
}

function makeDayWithSlots(
  slots: Array<[startIdx: number, endIdx: number]>,
): string[] {
  const arr = makeBlankDay();
  for (const [s, e] of slots) {
    for (let i = s; i < e; i++) {
      arr[i] = '1';
    }
  }
  return arr;
}

/**
 * 인덱스 = 시간(시*2 + (분===30?1:0))
 * 예) 09:00 → 9*2+0 = 18, 11:30 → 11*2+1 = 23
 */

export const dummySchedule: ScheduleDto = {
  monday: {
    value: makeDayWithSlots([
      [18, 23],
      [30, 34],
    ]),
  }, // 09:00–11:30, 15:00–17:00
  tuesday: { value: makeBlankDay() }, // 비어 있음
  wednesday: { value: makeDayWithSlots([[20, 26]]) }, // 10:00–13:00
  thursday: { value: makeBlankDay() },
  friday: { value: makeDayWithSlots([[16, 20]]) }, // 08:00–10:00
  saturday: { value: makeBlankDay() },
  sunday: { value: makeBlankDay() },
};
