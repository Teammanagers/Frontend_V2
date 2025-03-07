import styled from 'styled-components';
import { verticalButtonSizes } from '@/shared/config/constants/button.constants.ts';
import { IVerticalButtonProps } from '@/shared/types/button.types.ts';

/**
 * 수직 버튼 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <VerticalButton size="large" onClick={() => console.log("Click!")} icon={<img src={testIcon} />}>
 *   클릭!
 * </VerticalButton>
 *  ```
 *
 * @param {'small' | 'large'} size - 버튼 크기
 * @param {React.ReactNode} children - 버튼 내부의 텍스트
 * @param {() => void} onClick - 버튼 클릭 이벤트핸들러
 * @param {boolean} disabled=false - 버튼 비활성화 여부
 * @param {React.ReactNode} icon - 버튼 상단에 표시할 아이콘
 *
 * @description 버튼의 크기 정보 (size props)
 * ```
 *   small: { width: 78, height: 66, gap: 6 },
 *   large: { width: 80, height: 68, gap: 7 }
 * ```
 *
 */

export const VerticalButton = ({
  size,
  onClick,
  disabled = false,
  icon,
  children,
}: IVerticalButtonProps) => {
  const selectedSize = verticalButtonSizes[size];

  return (
    <ButtonContainer
      $sizes={selectedSize}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{
  $sizes: { width: number; height: number; gap: number };
  disabled?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  width: ${({ $sizes }) => $sizes.width}px;
  height: ${({ $sizes }) => $sizes.height}px;
  gap: ${({ $sizes }) => $sizes.gap}px;
  padding: 0;

  &:hover {
    background: ${({ disabled }) => (disabled ? '#FFFFFF' : '#f9fbff')};
    border: ${({ disabled }) =>
      disabled ? '1px solid #F0F0F0' : '1px solid #5C9EFF'};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
