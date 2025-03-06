import {
  buttonSizes,
  verticalButtonSizes,
  buttonStyles,
} from '@/shared/components/button/button.constants.ts';

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
