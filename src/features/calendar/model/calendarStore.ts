import { FetchEventResponse } from '@/entities/calendar/calendar.types';
import { EventEditorMode, Value } from '@/widgets/calendar/calendar.types';
import { create } from 'zustand';

interface CalendarStore {
  // 날짜 및 이벤트 선택
  selectedDate: Value | null;
  setSelectedDate: (date: Value | null) => void;
  selectedEvent: FetchEventResponse | null;
  setSelectedEvent: (event: FetchEventResponse | null) => void;

  // 모달
  isModalOpen: boolean;
  toggleModal: () => void;
  modalMode: EventEditorMode;
  setModalMode: (mode: EventEditorMode) => void;

  // 팝오버
  isPopoverOpen: boolean;
  setIsPopoverOpen: (isOpen: boolean) => void;
}

const useCalendarStore = create<CalendarStore>()((set) => ({
  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
  selectedEvent: null,
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  modalMode: 'register',
  setModalMode: (mode) => set({ modalMode: mode }),
  isPopoverOpen: false,
  setIsPopoverOpen: (isOpen) => set({ isPopoverOpen: isOpen }),
}));

export { useCalendarStore };
