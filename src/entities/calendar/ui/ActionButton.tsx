import styled from 'styled-components';
import { IActionButtonProps } from '../calendar.types';
import { buttonSize } from '../config/calendar.constants';
import PlusIcon from '@/shared/assets/common/plus.svg?react';

export default function ActionButton({
  buttonType = 'edit',
  onClick,
  disabled = false,
  toggle,
  setModalMode,
  ...props
}: IActionButtonProps) {
  const size = buttonSize[buttonType];

  const handleClick = () => {
    toggle();
    if (buttonType === 'edit') {
      setModalMode('edit');
    } else if (buttonType === 'add') {
      setModalMode('register');
    }
  };

  return (
    <Container
      $size={size}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {buttonType === 'edit' ? '수정' : '일정 추가하기'}
      {buttonType === 'add' && (
        <IconWrapper>
          <PlusIcon width={18} height={18} />
        </IconWrapper>
      )}
    </Container>
  );
}

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
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;
