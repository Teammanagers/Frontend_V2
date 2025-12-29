import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { FetchEventResponse } from '@/entities/calendar/calendar.types';
import { Dot } from '@/entities/calendar/ui';
import { EventSummaryPopover } from '@/features/calendar/ui/EventSummaryPopover';
import { useCalendarStore } from '../model';

interface UsePopoverRenderProps {
  eventList: FetchEventResponse[];
}

// 이벤트 데이터를 받아와서 팝오버를 렌더링하는 훅
const usePopoverRender = ({ eventList }: UsePopoverRenderProps) => {
  const { selectedDate, setIsPopoverOpen } = useCalendarStore(
    useShallow((state) => ({
      selectedDate: state.selectedDate,
      setIsPopoverOpen: state.setIsPopoverOpen,
    })),
  );

  // 날짜 선택 시 팝오버 열기
  useEffect(() => {
    if (selectedDate instanceof Date) setIsPopoverOpen(true);
  }, [selectedDate, setIsPopoverOpen]);

  const handleTileContent = useCallback(
    ({ date }: { date: Date }) => {
      if (!eventList) return null; // 데이터가 없을 때

      // 클릭한 날짜 중 이벤트가 있는 날짜 필터링
      const filteredEventList = eventList.filter(
        (event: FetchEventResponse) =>
          dayjs(event.planDto.date).format('YYYY-MM-DD') ===
          dayjs(date).format('YYYY-MM-DD'),
      );

      // 선택된 날짜와 같은 날짜인지 확인
      const isSelected =
        selectedDate instanceof Date &&
        selectedDate.getFullYear() === date.getFullYear() &&
        selectedDate.getMonth() === date.getMonth() &&
        selectedDate.getDate() === date.getDate();

      return (
        <>
          {isSelected && (
            <EventSummaryPopover date={date} eventList={filteredEventList} />
          )}
          {filteredEventList.length > 0 && <Dot isSelected={isSelected} />}
        </>
      );
    },
    [selectedDate, eventList],
  );

  return handleTileContent;
};

export { usePopoverRender };
