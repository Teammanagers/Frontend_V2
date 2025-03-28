import { useLayoutEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import dayjs from 'dayjs';
import PolygonArrow from '@/shared/assets/calendar/popover-arrow.svg?react';
import useClickOutside from '@/shared/hooks/action/useClickOutstide';
import { calculatePopoverPosition } from './lib/calculatePopoverPosition';

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

  useClickOutside(parentRef, setIsOpen); // popover 외부 클릭 시 닫힘

  // Popover가 캘린더 영역 넘어가지 않도록 배치
  useLayoutEffect(() => {
    if (!isOpen || !childRef.current) return; // popover가 닫혀 있거나 childRef가 없을 때

    const popover = childRef.current;

    calculatePopoverPosition(popover, setAdjustLeft);
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
