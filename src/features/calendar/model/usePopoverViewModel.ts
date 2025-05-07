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

  // 이벤트 클릭에 따른 모달 Mode 및 이벤트 데이터 설정
  const handleModalState = (
    event?: FetchEventResponse | null,
    mode?: EventEditorMode | null,
  ) => {
    if (event) {
      setSelectedEvent(event); // 선택된 이벤트 데이터 설정 -> 모달에 넘겨주기 위한 데이터

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
