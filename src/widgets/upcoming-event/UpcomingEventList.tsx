import styled from 'styled-components';
import { UpcomingSchedule } from '@/entities/calendar/ui';
import FallbackCard from '@/entities/main/ui/FallbackCard';
import useEventQueries from '@/features/calendar/model/useEventQueries';
import Skeleton from '@/shared/components/skeleton/Skeleton';

interface UpcomingEventListProps {
  limit?: 3 | 5; // 표시할 최대 일정 수: 메인(3), 캘린더(5)
  variant?: 'card' | 'list'; // 렌더링 스타일: card: 카드형 (메인) / list: 리스트형 (캘린더)
}

function UpcomingEventList({
  limit = 3,
  variant = 'card',
}: UpcomingEventListProps) {
  const { useUpcomingEventQuery } = useEventQueries();
  const {
    isPending,
    isSuccess,
    isError,
    data: eventList,
  } = useUpcomingEventQuery();

  if (isPending) {
    if (variant === 'card') return <Skeleton width="518px" height="222px" />;
    return (
      <EventListWrapper>
        {Array.from({ length: limit }).map((_, idx) => (
          <Skeleton
            key={`upcoming-event-skeleton-${idx}`}
            width="100%"
            height="66px"
          />
        ))}
      </EventListWrapper>
    );
  }

  const isEmpty = isSuccess && eventList.length === 0;

  if (isError || isEmpty) {
    const message = isError
      ? '일정을 불러올 수 없습니다.'
      : '아직 생성된 일정이 없습니다.';

    if (variant === 'card') return <FallbackCard>{message}</FallbackCard>;

    return (
      <Container>
        <CalendarFallback>{message}</CalendarFallback>
      </Container>
    );
  }

  return (
    <Container>
      <EventListWrapper>
        {isSuccess &&
          eventList
            .slice(0, limit)
            .map((event, idx) => (
              <UpcomingSchedule
                event={event.planDto}
                key={`upcoming-schedule-${idx}`}
              />
            ))}
      </EventListWrapper>
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
  height: 100%;
`;

const EventListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-height: 378px;
  overflow-y: auto;
`;

const CalendarFallback = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
`;
