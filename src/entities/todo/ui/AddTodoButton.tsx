import styled from 'styled-components';
import PlustIcon from '@/shared/assets/common/plus.svg?react';
import { Theme } from '@/app/styles/theme';

interface IAddTodoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function AddTodoButton({ ...props }: IAddTodoButtonProps) {
  return (
    <Button {...props}>
      <Label>내가 해야할 일</Label>
      <PlustIcon width={24} height={24} stroke="#1d1d1d" strokeWidth={2} />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 36px;
`;

const Label = styled.strong`
  font-size: 12px;
  font-weight: 600;
  color: ${Theme.colors.black};
`;
