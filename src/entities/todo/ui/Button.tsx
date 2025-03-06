import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  inValid?: boolean;
}

function Button({ children, inValid = false, ...props }: IButton) {
  return (
    <Container $inValid={inValid} {...props}>
      {children}
    </Container>
  );
}

export { Button };

const Container = styled.button<{
  $inValid: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 24px;
  border: ${({ $inValid }) => ($inValid ? '1px solid #5C9EFF' : 'none')};
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  color: ${({ $inValid }) => ($inValid ? '#5C9EFF' : '#fff')};
  background-color: ${({ $inValid }) => ($inValid ? '#fff' : '#5C9EFF')};
  cursor: pointer;
`;
