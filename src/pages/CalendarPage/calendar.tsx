import { UpcomingSchedule } from '@/entities/calendar/ui';
import EventCalendar from '@/widgets/calendar/ui/EventCalendar';
import styled from 'styled-components';

export function CalendarPage() {
  return (
    <Container>
      <EventCalendar />

      <UpcomingSchedulesWrapper>
        <UpcomingScheduleTitle>다가오는 일정</UpcomingScheduleTitle>
        <UpcomingScheduleList>
          {Array.from({ length: 3 }).map((_, idx) => (
            <UpcomingSchedule key={`upcoming-schedule-${idx}`} />
          ))}
        </UpcomingScheduleList>
      </UpcomingSchedulesWrapper>
    </Container>
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

const UpcomingScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
