import { IButtonStyle } from '@/shared/types/button.types.ts';

// 일반 버튼 크기
export const buttonSizes = {
  tiny: { width: 28, height: 24, fontSize: 10 },
  mini: { width: 96, height: 36, fontSize: 12 },
  small: { width: 158, height: 36, fontSize: 12 },
  medium: { width: 332, height: 36, fontSize: 12 },
  large: { width: 350, height: 48, fontSize: 16 },
  long: { width: 472, height: 36, fontSize: 12 },
  xl: { width: 472, height: 48, fontSize: 16 },
  xxl: { width: 664, height: 48, fontSize: 16 },
};

// 수직 버튼 크기
export const verticalButtonSizes = {
  small: { width: 78, height: 66, gap: 6 },
  large: { width: 80, height: 68, gap: 7 },
};

// 스타일
export const buttonStyles: Record<string, IButtonStyle> = {
  main: {
    backgroundColor: '#5C9EFF',
    textColor: '#FFFFFF',
    hoverBackgroundColor: '#3C8BFF',
  },
  sub: {
    backgroundColor: '#FFFFFF',
    textColor: '#5C9EFF',
    hoverBackgroundColor: '#DDEBFF',
    borderColor: '#5C9EFF',
  },
  red: {
    backgroundColor: '#FFFFFF',
    textColor: '#FF0000',
    hoverBackgroundColor: '#FFE9E9',
    borderColor: '#FF0000',
  },
  disabled: {
    backgroundColor: '#CCCCCC',
    textColor: '#FFFFFF',
  },
};
