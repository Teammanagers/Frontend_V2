import { useEffect, useState } from 'react';
import { TimeSlot, Weekday } from '@/entities/management/management.types';

const DEFAULT_WEEKLY_TIMES: Record<Weekday, TimeSlot[]> = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

export const useSchedule = (
  initialSchedule?: Partial<Record<Weekday, { value: TimeSlot[] }>>,
  onSubmit?: (weeklyTimes: Record<Weekday, TimeSlot[]>) => void,
) => {
  // 시작과 끝이 모두 00:00 인 경우에도 스케줄이 없다고 판단
  const hasSchedule =
    initialSchedule &&
    Object.values(initialSchedule).some((day) =>
      day?.value?.some(
        (slot) => !(slot.start === '00:00' && slot.end === '00:00'),
      ),
    );

  const [weeklyTimes, setWeeklyTimes] = useState<Record<Weekday, TimeSlot[]>>(
    () =>
      hasSchedule
        ? (Object.keys(DEFAULT_WEEKLY_TIMES) as Weekday[]).reduce(
            (acc, day) => {
              acc[day] = initialSchedule?.[day]?.value ?? [];
              return acc;
            },
            {} as Record<Weekday, TimeSlot[]>,
          )
        : DEFAULT_WEEKLY_TIMES,
  );

  useEffect(() => {
    if (hasSchedule) {
      const mapped = (Object.keys(DEFAULT_WEEKLY_TIMES) as Weekday[]).reduce(
        (acc, day) => {
          acc[day] = initialSchedule?.[day]?.value ?? [];
          return acc;
        },
        {} as Record<Weekday, TimeSlot[]>,
      );
      setWeeklyTimes(mapped);
    } else {
      setWeeklyTimes(DEFAULT_WEEKLY_TIMES);
    }
  }, [initialSchedule]);

  const [showRegister, setShowRegister] = useState<boolean>(false);
  const toggleRegister = () => setShowRegister((prev) => !prev);

  const changeTime = (day: Weekday, times: TimeSlot[]) => {
    setWeeklyTimes((prev) => ({ ...prev, [day]: times }));
  };

  const reset = () => {
    setWeeklyTimes(DEFAULT_WEEKLY_TIMES);
  };

  const submit = () => {
    console.log('등록된 시간:', weeklyTimes);
    onSubmit?.(weeklyTimes);
    setShowRegister(false);
  };

  return {
    showRegister,
    weeklyTimes,
    toggleRegister,
    changeTime,
    reset,
    submit,
  };
};
