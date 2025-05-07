import useClickOutside from '@/shared/hooks/action/useClickOutside';
import { useLayoutEffect, useRef, useState } from 'react';
import { calculatePopoverPosition, usePopoverAnimation } from '../lib';
import { useCalendarStore } from './calendarStore';
import { useShallow } from 'zustand/shallow';
import { FetchEventResponse } from '@/entities/calendar/calendar.types';
import { EventEditorMode } from '@/widgets/calendar/calendar.types';

const usePopoverViewModel = () => {
  const {
    setSelectedEvent,
    setModalMode,
    isModalOpen,
    toggleModal,
    isPopoverOpen,
    setIsPopoverOpen,
  } = useCalendarStore(
    useShallow((state) => ({
      setSelectedEvent: state.setSelectedEvent,
      setModalMode: state.setModalMode,
      isModalOpen: state.isModalOpen,
      toggleModal: state.toggleModal,
      isPopoverOpen: state.isPopoverOpen,
      setIsPopoverOpen: state.setIsPopoverOpen,
    })),
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // Popover ON/OFF 애니메이션

  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useClickOutside(parentRef, setIsPopoverOpen, isModalOpen); // popover 외부 클릭 시 닫힘 (모달이 열려 있는 경우 무시)
  usePopoverAnimation(isPopoverOpen, setIsAnimating); // 팝오버 애니메이션 관리

  const [adjustLeftPos, setAdjustLeftPos] = useState<string>('0%'); // Popover 위치 조정

  // Popover가 캘린더 영역 넘어가지 않도록 배치
  useLayoutEffect(() => {
    if (!isPopoverOpen || !childRef.current) return; // popover가 닫혀 있거나 childRef가 없을 때

    const popover = childRef.current;

    calculatePopoverPosition(popover, setAdjustLeftPos);
  }, [isPopoverOpen]);

  // 선택된 이벤트 데이터 및 모달 모드 관리
  const handleModalState = (
    event?: FetchEventResponse | null,
    mode?: EventEditorMode | null,
  ) => {
    // 강제 초기화하여 상태 변경 인식시키기
    // -> 같은 이벤트 연속 클릭 시 [selecetedEvent 동기화 useEffect 의존성 배열]이 동일한 상태를 참조하여 상태 변화 무시하는 것 방지
    setSelectedEvent(null);

    if (event) {
      setModalMode(mode ?? 'read');

      // 현재 실행 컨텍스트의 동기 작업이 모두 종료된 후 렌더 사이클이 다시 시작되는 시점에 비동기로 실행 -> selectedEvent 상태 업데이트
      setTimeout(() => {
        setSelectedEvent(event);
      }, 0);
    } else if (mode === 'register') {
      setModalMode('register');
    }

    toggleModal();
  };

  return {
    refs: {
      parentRef,
      childRef,
    },
    popover: { isPopoverOpen, isAnimating, adjustLeftPos },
    modal: { handleModalState },
  };
};

export { usePopoverViewModel };
