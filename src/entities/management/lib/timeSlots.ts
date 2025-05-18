import { TimeSlot } from '../model/ScheduleDto';

// 0, 1로 표시된 timetable을 TimeSlot[]으로 변환
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

// TimeSlot[]을 0, 1 문자열 배열로 변환
export const convertTimeSlotsToTimeTable = (slots: TimeSlot[]): string[] => {
  const table = Array(48).fill('0');
  slots.forEach(({ start, end }) => {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const sIdx = sh * 2 + (sm === 30 ? 1 : 0);
    const eIdx = eh * 2 + (em === 30 ? 1 : 0);
    for (let i = sIdx; i < eIdx; i++) table[i] = '1';
  });
  return table;
};
