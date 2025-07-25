import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'filled' | 'outlined';
  inValid?: boolean;
}

function Button({
  children,
  variant = 'filled',
  inValid = false,
  ...props
}: IButton) {
  return (
    <TodoActionButton $inValid={inValid} $variant={variant} {...props}>
      {children}
    </TodoActionButton>
  );
}

export { Button };

const TodoActionButton = styled.button<{
  $inValid: boolean;
  $variant: 'filled' | 'outlined';
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 24px;
  border: ${({ $inValid, $variant }) =>
    $inValid || $variant === 'outlined' ? '1px solid #5C9EFF' : 'none'};
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  color: ${({ $inValid, $variant }) =>
    $inValid || $variant === 'outlined' ? '#5C9EFF' : '#fff'};
  background-color: ${({ $inValid, $variant }) =>
    $inValid || $variant === 'outlined' ? '#fff' : '#5C9EFF'};
  cursor: pointer;
`;
