import { EventEditorMode } from '@/widgets/calendar/calendar.types';
import { ButtonHTMLAttributes } from 'react';

// 이벤트 타입
interface Event {
  date: string;
  title: string;
  content: string;
}

// 이벤트 조회 타입
type PlanDTO = Event & {
  id: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  useYn: string;
};

// 이벤트 API 반환 타입
type FetchEventResponse = {
  planDto: PlanDTO;
};

interface IEventSummaryProps {
  children: React.ReactNode;
  status: string;
  toggle: () => void;
  setModalMode: React.Dispatch<React.SetStateAction<EventEditorMode>>;
}

interface IActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'edit' | 'add';
  onClick?: () => void;
  disabled?: boolean;
  toggle: () => void;
  setModalMode: React.Dispatch<React.SetStateAction<EventEditorMode>>;
}

export type {
  Event,
  FetchEventResponse,
  IEventSummaryProps,
  IActionButtonProps,
};
