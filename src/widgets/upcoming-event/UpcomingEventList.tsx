import styled from 'styled-components';
import { UpcomingSchedule } from '@/entities/calendar/ui';
import FallbackCard from '@/entities/main/ui/FallbackCard';
import useEventQueries from '@/features/calendar/model/useEventQueries';
import Skeleton from '@/shared/components/skeleton/Skeleton';

function UpcomingEventList() {
  const { useUpcomingEventQuery } = useEventQueries();
  const {
    isPending,
    isSuccess,
    isError,
    data: eventList,
  } = useUpcomingEventQuery();

  if (isPending) return <Skeleton width={518} height={222} />;
  if (isError) return <FallbackCard>일정을 불러올 수 없습니다.</FallbackCard>;
  if (isSuccess && eventList.length === 0)
    return <FallbackCard>아직 생성된 일정이 없습니다.</FallbackCard>;

  return (
    <Container>
      <EventListWrapper>
        {isSuccess &&
          eventList.map((event, idx) => (
            <UpcomingSchedule
              event={event.planDto}
              key={`upcoming-schedule-${idx}`}
            />
          ))}
      </EventListWrapper>

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

const EventListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 222px;
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
