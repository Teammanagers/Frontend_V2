import { UpcomingSchedule } from '@/entities/calendar/ui';
import { RoutingButton } from '@/entities/main/ui';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useEventQueries from '@/features/calendar/model/useEventQueries';

function UpcomingEventList() {
  const location = useLocation();
  const path = location.pathname;

  const { useUpcomingEventQuery } = useEventQueries();
  const { isPending, isSuccess, data: eventList } = useUpcomingEventQuery();

  return (
    <Container>
      {path === '/' && (
        <RoutingButton url="/calendar">다가오는 일정</RoutingButton>
      )}

      {path === '/calendar' && (
        <UpcomingScheduleTitle>다가오는 일정</UpcomingScheduleTitle>
      )}

      {isPending &&
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

      {isSuccess && eventList.length === 0 && (
        <EmptySchedule>아직 생성된 일정이 없습니다.</EmptySchedule>
      )}
    </Container>
  );
}

export { UpcomingEventList };

const Container = styled.section`
  position: relative;
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

const EmptySchedule = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;
