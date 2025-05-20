import styled, { keyframes } from 'styled-components';
import dayjs from 'dayjs';
import PolygonArrow from '@/shared/assets/calendar/popover-arrow.svg?react';
import EventSummary from '@/entities/calendar/ui/EventSummary';
import { ActionButton } from '@/entities/calendar/ui';
import { usePopoverViewModel } from '@/features/calendar/model';
import { FetchEventResponse } from '@/entities/calendar/calendar.types';

interface IEventSummaryPopoverProps {
  date: Date;
  eventList: FetchEventResponse[];
}

function EventSummaryPopover({ date, eventList }: IEventSummaryPopoverProps) {
  const {
    refs: { parentRef, childRef },
    popover: { isPopoverOpen, isAnimating, adjustLeftPos },
    modal: { handleModalState },
  } = usePopoverViewModel();

  if (!isPopoverOpen && !isAnimating) return null; // 애니메이션이 완료된 후 컴포넌트 제거

  return (
    <Container
      ref={parentRef}
      $isPopoverOpen={isPopoverOpen}
      $isAnimating={isAnimating}
    >
      <PolygonArrowWrapper>
        <PolygonArrow />
      </PolygonArrowWrapper>

      {/* 내부 콘텐츠 */}
      <ContentWrapper ref={childRef} $left={adjustLeftPos}>
        <Date>{dayjs(date).format('YYYY-MM-DD')}</Date>

        {/* 이벤트 리스트 */}
        <EventList>
          {eventList.length > 0
            ? eventList.map((event) => (
                <EventSummaryWrapper key={event.planDto.id}>
                  <EventSummary onClick={() => handleModalState(event, 'read')}>
                    {event.planDto.title}
                  </EventSummary>

                  {/* 일정 수정 버튼 */}
                  <ActionButton
                    buttonType="edit"
                    onClick={() => handleModalState(event, 'edit')}
                  />
                </EventSummaryWrapper>
              ))
            : null}

          {/* 일정 추가하기 버튼 */}
          <ActionButton
            buttonType="register"
            onClick={() => handleModalState(null, 'register')}
          />
        </EventList>
      </ContentWrapper>
    </Container>
  );
}

export { EventSummaryPopover };

const scaleUp = keyframes`
  0% {
    transform: scale(0.2) ;
    opacity: 0;
  }
  80% {
    transform: scale(1.06);
    opacity: 1;
  }
  100% {
    transform: scale(1) ;
    opacity: 1;
  }
`;

const scaleDown = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

const PolygonArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div<{
  $isPopoverOpen: boolean;
  $isAnimating: boolean;
}>`
  position: absolute;
  top: 49px;
  width: 310px;
  z-index: 999;
  animation: ${({ $isPopoverOpen }) => ($isPopoverOpen ? scaleUp : scaleDown)}
    0.4s ease-in-out;
  cursor: default;
`;

const ContentWrapper = styled.div<{ $left: string }>`
  position: absolute;
  top: 12px;
  left: ${({ $left }) => $left};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  width: inherit;
  min-height: 83px;
  padding: 15px;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.subLightBlue};
`;

const Date = styled.span`
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const EventList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 280px;
`;

const EventSummaryWrapper = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 0;
  width: 100%;
  height: 24px;
  padding-left: 8px;

  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.black};
  }
`;
