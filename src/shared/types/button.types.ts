import {
  buttonSizes,
  verticalButtonSizes,
  buttonStyles,
} from '@/shared/config/constants/button.constants.ts';

export interface IButtonStyle {
  backgroundColor: string;
  textColor: string;
  hoverBackgroundColor?: string;
  borderColor?: string;
}

export interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  size: keyof typeof buttonSizes;
  style: keyof typeof buttonStyles;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface IVerticalButtonProps {
  size: keyof typeof verticalButtonSizes;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
