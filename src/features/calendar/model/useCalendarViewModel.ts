import { getCalendarHeight } from '../lib';
import { useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { Value } from '@/widgets/calendar/calendar.types';
import dayjs from 'dayjs';
import { useCalendarStore } from './calendarStore';

const useCalendarViewModel = () => {
  const { setSelectedDate } = useCalendarStore(
    useShallow((state) => ({
      setSelectedDate: state.setSelectedDate,
    })),
  );
  // 월 변경 시 상태 별도로 관리 -> selectedDate로 함께 관리하면 달 변경 시 팝오버 자동 렌더링 이슈 발생
  const [searchMonth, setSearchMonth] = useState<Date | null>(null);
  // 달력 높이
  const [calendarHeight, setCalendarHeight] = useState<string>(
    getCalendarHeight(searchMonth),
  );

  // 날짜 선택시 업데이트
  const handleDateChange = (newDate: Value) => {
    setSelectedDate(newDate);
  };

  // 달 변경 시 날짜 업데이트
  const updateMonth = (activeStartDate: Date | null) => {
    setSearchMonth(activeStartDate);
    setSelectedDate(null); // 선택된 날짜 초기화
  };

  // 달 변경 시 달력 높이 업데이트
  useEffect(() => {
    setCalendarHeight(getCalendarHeight(searchMonth));
  }, [searchMonth instanceof Date && searchMonth.getMonth()]);

  // 달 변경에 따른 API 요청 시 사용할 [연도-월] 쿼리 포맷
  const yearMonth = useMemo(() => {
    return searchMonth instanceof Date
      ? dayjs(searchMonth).format('YYYY-MM')
      : dayjs(new Date()).format('YYYY-MM');
  }, [searchMonth]);

  return {
    calendarHeight,
    handleDateChange,
    updateMonth,
    yearMonth,
  };
};

export { useCalendarViewModel };
