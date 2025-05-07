import EventCalendar from '@/widgets/calendar/ui/EventCalendar';
import { UpcomingEventList } from '@/widgets/upcoming-event';
import styled from 'styled-components';

export function CalendarPage() {
  return (
    <Container>
      <EventCalendar />

      <UpcomingSchedulesWrapper>
        <UpcomingEventList />
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
