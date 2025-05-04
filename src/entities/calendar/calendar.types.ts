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
  teamId: number;
  completed: boolean;
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
  isCompleted: boolean;
  onClick?: () => void;
}

type ActionButtonType = 'edit' | 'register';

interface IActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ActionButtonType;
  onClick?: () => void;
  disabled?: boolean;
}

export type {
  Event,
  FetchEventResponse,
  IEventSummaryProps,
  ActionButtonType,
  IActionButtonProps,
};
