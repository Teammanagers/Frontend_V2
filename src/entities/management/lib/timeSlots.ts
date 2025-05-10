import { TimeSlot } from '../model/ScheduleDto';

export const convertTimeTableToTimeSlots = (
  timeTable: string[],
): TimeSlot[] => {
  const timeSlots: TimeSlot[] = [];
  let startTime: string | null = null;

  timeTable.forEach((value, index) => {
    const time = `${String(Math.floor(index / 2)).padStart(2, '0')}:${
      index % 2 === 0 ? '00' : '30'
    }`;

    if (value === '1' && startTime === null) {
      startTime = time;
    } else if (value === '0' && startTime !== null) {
      timeSlots.push({ start: startTime, end: time });
      startTime = null;
    }
  });

  if (startTime !== null) {
    timeSlots.push({ start: startTime, end: '24:00' });
  }

  return timeSlots;
};
