import { useLayoutEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import dayjs from 'dayjs';
import PolygonArrow from '@/shared/assets/calendar/popover-arrow.svg?react';
import useClickOutside from '@/shared/hooks/action/useClickOutside';
import EventSummary from '@/entities/calendar/ui/EventSummary';
import { ActionButton } from '@/entities/calendar/ui';
import { EventEditorMode, IEventSummaryPopoverProps } from '../calendar.types';
import { usePopoverAnimation } from '../lib/usePopoverAnimation';
import { calculatePopoverPosition } from '../lib/calculatePopoverPosition';
import { FetchEventResponse } from '@/entities/calendar/calendar.types';

function EventSummaryPopover({
  date,
  eventList,
  setSelectedEvent,
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

  // 이벤트 클릭에 따른 모달 Mode 및 이벤트 데이터 설정
  const handleEventClick = (
    event?: FetchEventResponse | null,
    mode?: EventEditorMode | null,
  ) => {
    if (event) {
      setSelectedEvent(event); // 선택된 이벤트 데이터 설정

      // 모달 모드 설정
      if (mode === 'edit') {
        setModalMode('edit');
      } else if (mode === 'read') {
        setModalMode('read');
      }
    } else if (mode === 'register') {
      setSelectedEvent(null); // 선택된 이벤트 데이터 초기화
      setModalMode('register');
    }
    toggle();
  };

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
                  <EventSummary
                    isCompleted={event.planDto.completed}
                    onClick={() => handleEventClick(event, 'read')}
                  >
                    {event.planDto.title}
                  </EventSummary>
                  {event.planDto.completed || (
                    <ActionButton
                      buttonType="edit"
                      onClick={() => handleEventClick(event, 'edit')}
                    />
                  )}
                </EventSummaryWrapper>
              ))
            : null}

          {/* 일정 추가하기 버튼 */}
          <ActionButton
            buttonType="register"
            onClick={() => handleEventClick(null, 'register')}
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

const EventSummaryWrapper = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
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
