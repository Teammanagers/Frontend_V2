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
  size: keyof typeof buttonSizes;
  style: keyof typeof buttonStyles;
  children: React.ReactNode;
  onClick?: () => void;
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
