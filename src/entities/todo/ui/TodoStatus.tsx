import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CheckIcon from '@/shared/assets/todo/check.svg?react';
import { ITodoStatus, Status } from '../todo.type';

function TodoStatus({
  status = 'PENDING',
  modalToggle,
  ...props
}: ITodoStatus) {
  const [todoStatus, setTodoStatus] = useState<Status>(status);

  // 관련 로직 분리 필요
  const handleTodoStatus = () => {
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
    <Container $todoStatus={todoStatus} {...props} onClick={handleTodoStatus}>
      <IconWrapper $todoStatus={todoStatus}>
        {todoStatus === 'IN_PROGRESS' || <CheckIcon />}

        {todoStatus === 'IN_PROGRESS' && <ProceedingBar />}
      </IconWrapper>
    </Container>
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

const Container = styled.button<{ $todoStatus: Status }>`
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
