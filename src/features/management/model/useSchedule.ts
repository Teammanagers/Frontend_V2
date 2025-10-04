// features/schedule/model/useSchedule.ts
import { useState } from 'react';
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

export const useSchedule = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [weeklyTimes, setWeeklyTimes] = useState(DEFAULT_WEEKLY_TIMES);

  const toggleRegister = () => setShowRegister((prev) => !prev);

  const changeTime = (day: Weekday, times: TimeSlot[]) => {
    setWeeklyTimes((prev) => ({ ...prev, [day]: times }));
  };

  const reset = () => {
    setWeeklyTimes(DEFAULT_WEEKLY_TIMES);
  };

  const submit = () => {
    console.log('등록된 시간:', weeklyTimes);
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
