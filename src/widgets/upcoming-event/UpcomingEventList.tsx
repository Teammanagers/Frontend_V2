import useEventQueries from '@/entities/calendar/model/useEventQueries';
import { UpcomingSchedule } from '@/entities/calendar/ui';
import { RoutingButton } from '@/entities/main/ui';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useDelayPendingState from '@/shared/hooks/useDelayPendingState';

function UpcomingEventList() {
  const location = useLocation();
  const path = location.pathname;

  const { useUpcomingEventQuery } = useEventQueries();
  const { isPending, isSuccess, data: eventList } = useUpcomingEventQuery();

  const showSkeleton = useDelayPendingState(1000, isPending); // 1초 후에 스켈레톤 렌더링

  return (
    <Container>
      {path === '/' && (
        <RoutingButton url="/calendar">다가오는 일정</RoutingButton>
      )}

      {path === '/calendar' && (
        <UpcomingScheduleTitle>다가오는 일정</UpcomingScheduleTitle>
      )}

      {showSkeleton &&
        Array.from({ length: path === '/' ? 3 : 6 }).map((_, idx) => (
          <Skeleton
            key={`notice-skeleton-${idx}`}
            width={path === '/' ? 518 : 436}
            height={66}
          />
        ))}

      <SchedulListWrapper $path={path}>
        {isSuccess &&
          eventList.map((event, idx) => (
            <UpcomingSchedule
              event={event.planDto}
              key={`upcoming-schedule-${idx}`}
            />
          ))}
      </SchedulListWrapper>
    </Container>
  );
}

export { UpcomingEventList };

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
`;

const UpcomingScheduleTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const SchedulListWrapper = styled.ul<{ $path: string }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: ${({ $path }) => ($path === '/' ? '222px' : '534px')};
  overflow-y: auto;
`;
