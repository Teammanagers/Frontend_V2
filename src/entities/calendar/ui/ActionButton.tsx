import styled from 'styled-components';
import { buttonSize } from '../calendar.constants';
import PlusIcon from '@/shared/assets/common/plus.svg?react';
import { ButtonHTMLAttributes } from 'react';

type ActionButtonType = 'edit' | 'register';
interface IActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ActionButtonType;
  onClick?: () => void;
  disabled?: boolean;
}

function ActionButton({
  buttonType = 'edit',
  onClick,
  disabled = false,
  ...props
}: IActionButtonProps) {
  const size = buttonSize[buttonType];

  return (
    <Container $size={size} onClick={onClick} disabled={disabled} {...props}>
      {buttonType === 'edit' ? '수정' : '일정 추가하기'}
      {buttonType === 'register' && (
        <IconWrapper>
          <PlusIcon width={18} height={18} />
        </IconWrapper>
      )}
    </Container>
  );
}

export { ActionButton };

const Container = styled.button<{
  $size: (typeof buttonSize)[keyof typeof buttonSize];
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: ${({ $size }) => $size.width}px;
  height: ${({ $size }) => $size.height}px;
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  border-radius: 4px;
  font-size: ${({ $size }) => $size.fontSize}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mainBlue};
  background-color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.subLightBlue};
    transition: background-color 0.3s;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;
