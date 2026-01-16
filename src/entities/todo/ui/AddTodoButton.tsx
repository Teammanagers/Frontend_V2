import { ComponentProps } from 'react';
import styled from 'styled-components';
import { Theme } from '@/app/styles/theme';
import { useIsTeamLeader } from '@/entities/team/model/useIsTeamLeader';
import PlusIcon from '@/shared/assets/common/plus.svg?react';

type AddTodoButtonProps = ComponentProps<'button'> & {
  isMe: boolean;
};

export default function AddTodoButton({ isMe, ...props }: AddTodoButtonProps) {
  const { isTeamLeader } = useIsTeamLeader();

  if (!isMe && !isTeamLeader) return null;

  return (
    <Button {...props}>
      <Label>{isMe ? '내가 해야할 일' : '팀원이 해야할 일'}</Label>
      <PlusIcon width={24} height={24} stroke="#1d1d1d" strokeWidth={2} />
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
