import { ButtonHTMLAttributes, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CheckIcon from '@/shared/assets/todo/check.svg?react';
import { Status } from '../todo.type';
import useTodoQuries from '@/features/todo/model/useTodoQuries';
import { STATUS_TO_OPTION } from '../constants/todo';

interface ITodoStatus extends ButtonHTMLAttributes<HTMLButtonElement> {
  status: Status;
  modalToggle: () => void;
  todoId: number;
}

function TodoStatus({ status, todoId, modalToggle, ...props }: ITodoStatus) {
  const { useEditTodoStatusMutation } = useTodoQuries();
  const { mutate: editTodoStatus } = useEditTodoStatusMutation(todoId);

  const [todoStatus, setTodoStatus] = useState<Status>(status);

  // 관련 로직 분리 필요
  const handleTodoStatus = () => {
    const option = STATUS_TO_OPTION[status]; // 상태에 따른 option 값 가져오기
    editTodoStatus(option); // 상태 변경 API 호출

    // ui 상태 변경
    if (todoStatus === 'PENDING') {
      setTodoStatus('IN_PROGRESS');
    } else if (todoStatus === 'IN_PROGRESS') {
      setTodoStatus('COMPLETED');
      modalToggle(); // 이미지 업로드 모달 열기
    } else if (todoStatus === 'COMPLETED') {
      setTodoStatus('PENDING');
    }
  };

  return (
    <TodoStatusButton
      $todoStatus={todoStatus}
      {...props}
      onClick={handleTodoStatus}
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
