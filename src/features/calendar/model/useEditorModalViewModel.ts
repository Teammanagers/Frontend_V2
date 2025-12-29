import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { CalendarEvent } from '@/entities/calendar/calendar.types';
import { useCalendarStore } from './calendarStore';

interface RequestData {
  planId: number;
  title: string;
  content: string;
}

interface MutationFn {
  createEvent: (inputValue: CalendarEvent) => void;
  editEvent: (requestData: RequestData) => void;
  deleteEvent: (requestData: RequestData) => void;
}

const useEditorModalViewModel = (date: Date) => {
  const { selectedEvent, isModalOpen, toggleModal, modalMode, setModalMode } =
    useCalendarStore(
      useShallow((state) => ({
        selectedEvent: state.selectedEvent,
        isModalOpen: state.isModalOpen,
        toggleModal: state.toggleModal,
        modalMode: state.modalMode,
        setModalMode: state.setModalMode,
      })),
    );
  const formattedDate = dayjs(date).format('YYYY-MM-DD');

  const [inputValue, setInputValue] = useState<CalendarEvent>({
    date: formattedDate,
    title: '',
    content: '',
  });

  // EventSummaryPopover와 selectedEvent 데이터 동기화
  useEffect(() => {
    if (selectedEvent) {
      if (modalMode === 'edit') {
        setInputValue({
          date: formattedDate,
          title: selectedEvent.planDto.title,
          content: selectedEvent.planDto.content,
        });
      }
    } else if (modalMode === 'register') {
      setInputValue({
        date: formattedDate,
        title: '',
        content: '',
      });
    }
  }, [modalMode, selectedEvent, formattedDate]);

  // 일정 추가, 수정, 삭제, 완료 API 호출
  // mutation을 외부에서 주입 받으면서 함수가 매번 새로 생성되며 리렌더링되는 것 방지 (useCallback)
  const handleSubmitEvent = useCallback(
    (
      mode: 'register' | 'edit' | 'delete' | 'complete',
      { createEvent, editEvent, deleteEvent }: MutationFn,
      currInputValue: Omit<RequestData, 'planId'> & { date: string },
    ) => {
      if (mode === 'register') {
        // 일정 추가
        createEvent(currInputValue);
      } else if (selectedEvent !== null) {
        // 일정 수정 및 삭제 시 요청 데이터 폼
        const requestData = {
          planId: selectedEvent.planDto.id,
          title: currInputValue.title,
          content: currInputValue.content,
        };

        if (mode === 'edit') {
          // 일정 수정
          editEvent(requestData);
        } else if (mode === 'delete') {
          // 일정 삭제
          deleteEvent(requestData);
        }
      }

      toggleModal();
    },
    [selectedEvent, toggleModal],
  );

  // 모달이 닫힌 후 0.5초 후에 inputValue 초기화 -> 닫히면서 inputValue가 초기화되는 현상 방지
  useEffect(() => {
    if (!isModalOpen) {
      const timeoutId = setTimeout(() => {
        setInputValue({
          date: formattedDate,
          title: '',
          content: '',
        });
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [isModalOpen, formattedDate]);

  // 일정 추가하기 버튼 활성화 여부 (일정 제목, 내용이 비어있지 않은 경우)
  const isValid =
    inputValue.title.trim() !== '' && inputValue.content.trim() !== '';

  return {
    selectedEvent,
    isModalOpen,
    toggleModal,
    modalMode,
    setModalMode,
    inputValue,
    setInputValue,
    handleSubmitEvent,
    isValid,
  };
};

export { useEditorModalViewModel };
