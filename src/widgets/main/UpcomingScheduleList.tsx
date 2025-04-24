import { UpcomingSchedule } from '@/entities/calendar/ui';
import { RoutingButton } from '@/entities/main/ui';
import styled from 'styled-components';

function UpcomingScheduleList() {
  return (
    <Container>
      <RoutingButton url="/calendar">다가오는 일정</RoutingButton>

      <SchedulListWrapper>
        {Array.from({ length: 3 }).map((_, idx) => (
          <UpcomingSchedule key={`upcoming-schedule-${idx}`} />
        ))}
      </SchedulListWrapper>
    </Container>
  );
}

export { UpcomingScheduleList };

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 518px;
`;

const SchedulListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
