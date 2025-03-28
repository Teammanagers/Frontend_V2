import { useLayoutEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import dayjs from 'dayjs';
import PolygonArrow from '@/shared/assets/calendar/popover-arrow.svg?react';
import useClickOutside from '@/shared/hooks/action/useClickOutstide';
import { POPOVER_OFFSET } from './\bconfig/calendar.constants';

function EventSummaryPopover({
  date,
  setIsOpen,
  isOpen,
}: {
  date: Date;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const [adjustLeft, setAdjustLeft] = useState<string>('0%');

  useClickOutside(parentRef, setIsOpen);

  // Popover가 캘린더 영역 넘어가지 않도록 배치
  useLayoutEffect(() => {
    if (!isOpen) return; // 팝오버가 닫혀 않으면 실행하지 않음

    const popover = childRef.current;
    if (popover) {
      const rect = popover.getBoundingClientRect(); // popover의 화면상의 위치 및 크기 정보
      const calendar = popover.closest('.react-calendar'); // class가 react-calendar인 가장 가까운 부모 요소 반환
      const calendarRect = calendar?.getBoundingClientRect(); // 달력의 위치 정보

      if (calendarRect) {
        const overflowRight = rect.right >= calendarRect.right - POPOVER_OFFSET; // popover가 달력의 오른쪽을 넘어갈 때
        const overflowLeft = rect.left - POPOVER_OFFSET <= calendarRect.left; // popover가 달력의 왼쪽을 넘어갈 때 (transform으로 왜곡된 값만큼 보정)

        console.log(
          'rect.right',
          rect.right,
          'calendarRect.right',
          calendarRect.right,
        );
        if (overflowRight) {
          setAdjustLeft('-25%');
        } else if (overflowLeft) {
          setAdjustLeft('25%');
        } else {
          setAdjustLeft('0%');
        }
      }
    }
  }, [isOpen]);

  return (
    <Container ref={parentRef} $isOpen={isOpen} $left={adjustLeft}>
      <ArrowIconWrapper>
        <PolygonArrow />
      </ArrowIconWrapper>

      <ContentWrapper ref={childRef} $isOpen={isOpen} $left={adjustLeft}>
        <Date>{dayjs(date).format('YYYY-MM-DD')}</Date>
      </ContentWrapper>
    </Container>
  );
}

export { EventSummaryPopover };

const scaleUp = keyframes`
  0% {
    transform: scale(0.1) ;
    opacity: 0;
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
    transform: scale(0.1);
    opacity: 0;
  }
`;

const ArrowIconWrapper = styled.div``;

const Container = styled.div<{ $isOpen: boolean; $left: string }>`
  position: absolute;
  top: 48px;
  width: 310px;
  z-index: 999;
  animation: ${({ $isOpen }) => ($isOpen ? scaleUp : scaleDown)} 0.35s
    ease-in-out;

  ${ArrowIconWrapper} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ContentWrapper = styled.div<{ $isOpen: boolean; $left: string }>`
  position: absolute;
  top: 12px;
  left: ${({ $left }) => $left};
  width: inherit;
  min-height: 83px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.subLightBlue};
`;

const Date = styled.span`
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;
