import { ButtonHTMLAttributes } from 'react';

interface IEventSummaryProps {
  children: React.ReactNode;
}

interface IActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'edit' | 'add';
  onClick?: () => void;
  disabled?: boolean;
}

export type { IEventSummaryProps, IActionButtonProps };
