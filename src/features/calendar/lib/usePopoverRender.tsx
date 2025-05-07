import { useShallow } from 'zustand/shallow';
import { useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import { FetchEventResponse } from '@/entities/calendar/calendar.types';
import { EventSummaryPopover } from '@/features/calendar/ui/EventSummaryPopover';
import { Dot } from '@/entities/calendar/ui';
import { useCalendarStore } from '../model';

interface UsePopoverRenderProps {
  eventList: FetchEventResponse[];
  isSuccess: boolean | undefined;
}

// 이벤트 데이터를 받아와서 팝오버를 렌더링하는 훅
const usePopoverRender = ({ eventList, isSuccess }: UsePopoverRenderProps) => {
  const { selectedDate, isPopoverOpen, setIsPopoverOpen } = useCalendarStore(
    useShallow((state) => ({
      selectedDate: state.selectedDate,
      isPopoverOpen: state.isPopoverOpen,
      setIsPopoverOpen: state.setIsPopoverOpen,
    })),
  );

  // 날짜 선택 시 팝오버 열기
  useEffect(() => {
    setIsPopoverOpen(true);
  }, [selectedDate]);

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
    [selectedDate, isPopoverOpen, isSuccess, eventList],
  );

  return handleTileContent;
};

export { usePopoverRender };
