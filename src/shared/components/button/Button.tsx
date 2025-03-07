import styled from 'styled-components';
import {
  buttonSizes,
  buttonStyles,
} from '@/shared/config/constants/button.constants.ts';
import { IButtonProps } from '@/shared/types/button.types.ts';

/**
 * 일반 버튼(가로) 컴포넌트입니다.
 *
 * `disabled` 속성을 사용할 시 style과 disabled props 모두 `disabled` 적용이 필요합니다.
 *
 * @example
 * ```tsx
 * <Button size="large" style="main" onClick={() => console.log("Click!")} icon={<img src={testIcon} />}>
 *   클릭!
 * </Button>
 *  ```
 *
 * @param {'tiny' | 'mini' | 'small' | 'medium' | 'large' | 'long' | 'xl' | 'xxl'} size - 버튼 크기
 * @param {'main' | 'sub' | 'red' | 'disabled'} style - 버튼 스타일
 * @param {React.ReactNode} children - 버튼 내부의 텍스트
 * @param {() => void} onClick - 버튼 클릭 이벤트핸들러
 * @param {boolean} disabled=false - 버튼 비활성화 여부
 * @param {React.ReactNode} icon - 버튼 왼쪽에 표시할 아이콘, optional
 *
 * @description 버튼의 크기 정보 (size props)
 * ```
 *   tiny: { width: 28, height: 24, fontSize: 10 },
 *   mini: { width: 96, height: 36, fontSize: 12 },
 *   small: { width: 158, height: 36, fontSize: 12 },
 *   medium: { width: 332, height: 36, fontSize: 12 },
 *   large: { width: 350, height: 48, fontSize: 16 },
 *   long: { width: 472, height: 36, fontSize: 12 },
 *   xl: { width: 472, height: 48, fontSize: 16 },
 *   xxl: { width: 664, height: 48, fontSize: 16 }
 * ```
 *
 * @description 버튼 스타일 정보 (style props)
 * ```
 * main: {
 *     backgroundColor: '#5C9EFF',
 *     textColor: '#FFFFFF',
 *     hoverBackgroundColor: '#3C8BFF',
 *   },
 *   sub: {
 *     backgroundColor: '#FFFFFF',
 *     textColor: '#5C9EFF',
 *     hoverBackgroundColor: '#DDEBFF',
 *     borderColor: '#5C9EFF',
 *   },
 *   red: {
 *     backgroundColor: '#FFFFFF',
 *     textColor: '#FF0000',
 *     hoverBackgroundColor: '#FFE9E9',
 *     borderColor: '#FF0000',
 *   },
 *   disabled: {
 *     backgroundColor: '#CCCCCC',
 *     textColor: '#FFFFFF',
 *   }
 * ```
 */

export const Button = ({
  size,
  style,
  children,
  onClick,
  disabled = false,
  icon,
}: IButtonProps) => {
  const selectedSize = buttonSizes[size];
  const selectedStyle = buttonStyles[style];

  return (
    <ButtonContainer
      $sizes={selectedSize}
      $styles={selectedStyle}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{
  $sizes: (typeof buttonSizes)[keyof typeof buttonSizes];
  $styles: (typeof buttonStyles)[keyof typeof buttonStyles];
  disabled: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  width: ${({ $sizes }) => $sizes.width}px;
  height: ${({ $sizes }) => $sizes.height}px;
  font-size: ${({ $sizes }) => $sizes.fontSize}px;
  border-radius: 4px;
  border: 1px solid
    ${({ $styles, disabled }) =>
      disabled ? 'transparent' : $styles.borderColor || 'transparent'};
  background: ${({ $styles, disabled }) =>
    disabled ? buttonStyles.disabled.backgroundColor : $styles.backgroundColor};
  color: ${({ $styles, disabled }) =>
    disabled ? buttonStyles.disabled.textColor : $styles.textColor};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ $styles, disabled }) =>
      disabled
        ? buttonStyles.disabled.backgroundColor
        : $styles.hoverBackgroundColor};
  }
  padding: 0;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;
