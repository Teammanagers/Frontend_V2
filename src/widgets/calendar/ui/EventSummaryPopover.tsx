import { useLayoutEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import dayjs from 'dayjs';
import PolygonArrow from '@/shared/assets/calendar/popover-arrow.svg?react';
import useClickOutside from '@/shared/hooks/action/useClickOutside';
import EventSummary from '@/entities/calendar/ui/EventSummary';
import { ActionButton } from '@/entities/calendar/ui';
import { IEventSummaryPopoverProps } from '../calendar.types';
import { usePopoverAnimation } from '../lib/usePopoverAnimation';
import { calculatePopoverPosition } from '../lib/calculatePopoverPosition';

function EventSummaryPopover({
  date,
  eventList,
  isPopoverOpen,
  isModalOpen,
  setIsPopoverOpen,
  toggle,
  setModalMode,
}: IEventSummaryPopoverProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const [adjustLeftPos, setAdjustLeftPos] = useState<string>('0%'); // Popover 위치 조정
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // Popover ON/OFF 애니메이션

  useClickOutside(parentRef, setIsPopoverOpen, isModalOpen); // popover 외부 클릭 시 닫힘 (모달이 열려 있는 경우 무시)
  usePopoverAnimation(isPopoverOpen, setIsAnimating); // 팝오버 애니메이션 관리

  // Popover가 캘린더 영역 넘어가지 않도록 배치
  useLayoutEffect(() => {
    if (!isPopoverOpen || !childRef.current) return; // popover가 닫혀 있거나 childRef가 없을 때

    const popover = childRef.current;

    calculatePopoverPosition(popover, setAdjustLeftPos);
  }, [isPopoverOpen]);

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
                <EventSummary
                  key={event.planDto.id}
                  status={event.planDto.useYn}
                  toggle={toggle}
                  setModalMode={setModalMode}
                >
                  {event.planDto.content}
                </EventSummary>
              ))
            : null}
          <ActionButton
            buttonType="add"
            toggle={toggle}
            setModalMode={setModalMode}
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
  width: 100%;
`;
