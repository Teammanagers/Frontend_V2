import { ButtonHTMLAttributes, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import checkIcon from '@/shared/assets/icons/check.svg';
import { Status } from '../todo.type';

interface ITodoStatus extends ButtonHTMLAttributes<HTMLButtonElement> {
  status?: Status;
}

function TodoStatus({ status = 'TODO', ...props }: ITodoStatus): JSX.Element {
  const [todoStatus, setTodoStatus] = useState<Status>(status);

  const handleTodoStatus = () => {
    if (todoStatus === 'TODO') {
      setTodoStatus('PROCEEDING');
    } else if (todoStatus === 'PROCEEDING') {
      setTodoStatus('COMPLETED');
    } else {
      setTodoStatus('TODO');
    }
  };

  return (
    <Container $todoStatus={todoStatus} {...props} onClick={handleTodoStatus}>
      <IconWrapper $todoStatus={todoStatus}>
        {todoStatus === 'PROCEEDING' || (
          <img src={checkIcon} alt="check icon" />
        )}

        {todoStatus === 'PROCEEDING' && <ProceedingBar />}
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
      : $todoStatus === 'PROCEEDING'
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
  opacity: ${({ $todoStatus }) => ($todoStatus === 'TODO' ? 0.7 : 1)};
  animation: ${fadeIn} 0.3s ease;
`;

const ProceedingBar = styled.div`
  width: 12px;
  height: 3px;
  border-radius: 100px;
  background-color: #5c9eff;
  animation: ${fadeIn} 0.3s ease;
`;
