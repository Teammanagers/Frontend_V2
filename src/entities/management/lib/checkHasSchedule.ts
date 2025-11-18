import { TimeSlot, Weekday } from '@/entities/management/management.types.ts';

export const checkHasSchedule = (
  mySchedule?: Partial<Record<Weekday, { value: TimeSlot[] }>>,
) => {
  if (!mySchedule) return false;

  return Object.values(mySchedule).some((day) => day?.value?.length > 0);
};
