import { ComponentProps } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTodoStatus } from '@/features/todo/model/useTodoStatus';
import CheckIcon from '@/shared/assets/todo/check.svg?react';
import { Status, TodoItem } from '../todo.type';

interface TodoStatusProps extends ComponentProps<'button'> {
  todo: TodoItem;
  modalToggle: () => void;
}

function TodoStatus({ todo, modalToggle, ...props }: TodoStatusProps) {
  const { todoStatus, handleTodoStatus } = useTodoStatus(
    todo.status,
    todo.id,
    modalToggle,
  );

  return (
    <TodoStatusButton
      $todoStatus={todoStatus}
      onClick={handleTodoStatus}
      {...props}
    >
      <IconWrapper $todoStatus={todoStatus}>
        {todoStatus === 'IN_PROGRESS' || <CheckIcon />}

        {todoStatus === 'IN_PROGRESS' && <ProceedingBar />}
      </IconWrapper>
    </TodoStatusButton>
  );
}

export { TodoStatus };

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const TodoStatusButton = styled.button<{ $todoStatus: Status }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  border-radius: 2px;
  background-color: ${({ $todoStatus }) =>
    $todoStatus === 'COMPLETED'
      ? '#5C9EFF'
      : $todoStatus === 'IN_PROGRESS'
        ? '#DDEBFF'
        : '#CCC'};
  transition: background-color 0.4s ease;
  animation: ${fadeIn} 0.3s ease;
  cursor: pointer;
`;

const IconWrapper = styled.div<{ $todoStatus: Status }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  opacity: ${({ $todoStatus }) => ($todoStatus === 'PENDING' ? 0.7 : 1)};
  animation: ${fadeIn} 0.3s ease;
`;

const ProceedingBar = styled.div`
  width: 12px;
  height: 3px;
  border-radius: 100px;
  background-color: #5c9eff;
  animation: ${fadeIn} 0.3s ease;
`;
