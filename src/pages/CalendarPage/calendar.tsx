import styled from 'styled-components';
import { usePopoverRender } from '@/features/calendar/lib';
import { useCalendarStore } from '@/features/calendar/model';
import { EventEditorModal } from '@/features/calendar/ui';
import useEventQueries from '@/features/calendar/model/useEventQueries';
import EventCalendar from '@/widgets/calendar/ui/EventCalendar';
import { UpcomingEventList } from '@/widgets/upcoming-event';
import { useCalendarViewModel } from '@/widgets/calendar/model/useCalendarViewModel';

export function CalendarPage() {
  const selectedDate = useCalendarStore((state) => state.selectedDate);

  // 달 변경에 따른 이벤트 데이터 패칭 시 사용할 [연도-월] 쿼리 포맷
  const { yearMonth } = useCalendarViewModel();

  // 해당 달의 이벤트 데이터 가져오기
  const { useEventQuery } = useEventQueries(yearMonth);
  const { data: eventList, isSuccess } = useEventQuery();

  // 팝오버 렌더링
  const handleTileContent = usePopoverRender({ eventList, isSuccess });

  return (
    <>
      <Container>
        {/* 캘린더 */}
        <EventCalendar handleTileContent={handleTileContent} />

        {/* 다가오는 일정 */}
        <UpcomingSchedulesWrapper>
          <UpcomingScheduleTitle>다가오는 일정</UpcomingScheduleTitle>
          <UpcomingEventList />
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
`;

const UpcomingScheduleTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;
