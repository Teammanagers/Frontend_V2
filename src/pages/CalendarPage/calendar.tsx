import styled from 'styled-components';
import { usePopoverRender } from '@/features/calendar/lib';
import { useCalendarStore } from '@/features/calendar/model';
import useEventQueries from '@/features/calendar/model/useEventQueries';
import { EventEditorModal } from '@/features/calendar/ui';
import { useCalendarViewModel } from '@/widgets/calendar/model/useCalendarViewModel';
import EventCalendar from '@/widgets/calendar/ui/EventCalendar';
import { UpcomingEventList } from '@/widgets/upcoming-event';

export function CalendarPage() {
  const selectedDate = useCalendarStore((state) => state.selectedDate);

  const { yearMonth, calendarHeight, handleDateChange, updateMonth } =
    useCalendarViewModel();

  // 해당 달의 이벤트 데이터 가져오기
  const { useEventQuery } = useEventQueries(yearMonth);
  const { data: eventList } = useEventQuery();

  // 팝오버 렌더링
  const handleTileContent = usePopoverRender({ eventList });

  return (
    <>
      <Container>
        {/* 캘린더 */}
        <EventCalendar
          calendarHeight={calendarHeight}
          updateMonth={updateMonth}
          handleDateChange={handleDateChange}
          handleTileContent={handleTileContent}
        />

        {/* 다가오는 일정 */}
        <UpcomingSchedulesWrapper>
          <UpcomingScheduleTitle>다가오는 일정</UpcomingScheduleTitle>
          <UpcomingEventList limit={5} variant="list" />
        </UpcomingSchedulesWrapper>
      </Container>

      {/* 이벤트 액션 모달 */}
      {selectedDate instanceof Date && <EventEditorModal date={selectedDate} />}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 100px;
`;

const UpcomingSchedulesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 436px;
  height: 520px;
`;

const UpcomingScheduleTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;
