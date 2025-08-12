import styled from 'styled-components';
import PlusIcon from '@/shared/assets/common/plus.svg?react';
import { Theme } from '@/app/styles/theme';

interface IAddResourceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'large';
}

export default function AddResourceButton({
  size = 'large',
  ...props
}: IAddResourceButtonProps) {
  return (
    <Container $size={size} {...props}>
      <PlusIcon stroke="#1d1d1d" stroke-width="2" />
      <span>파일 추가하기</span>
    </Container>
  );
}

const Container = styled.button<{ $size: 'small' | 'large' }>`
  display: flex;
  flex-direction: ${({ $size }) =>
    $size === 'large' ? 'row-reverse' : 'column'};
  align-items: center;
  justify-content: center;
  gap: ${({ $size }) => ($size === 'large' ? '8px' : '7px')};
  width: ${({ $size }) => ($size === 'large' ? '100%' : '80px')};
  height: ${({ $size }) => ($size === 'large' ? '66px' : '68px')};
  border: 1px solid ${Theme.colors.lightGray};
  border-radius: 6px;
  background-color: ${Theme.colors.white};

  span {
    font-size: ${({ $size }) => ($size === 'large' ? '12px' : '10px')};
    font-weight: ${({ $size }) => ($size === 'large' ? '600' : '400')};
    color: ${Theme.colors.black};
  }
`;
