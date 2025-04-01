import { EventEditorMode } from '@/widgets/calendar/calendar.types';
import { ButtonHTMLAttributes } from 'react';

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

export type { IEventSummaryProps, IActionButtonProps };
