import styled from 'styled-components';
import { TodoStatus } from './TodoStatus';
import { ITodoInfo } from '../todo.type';

interface ITodoPreviewProps extends ITodoInfo {
  modalToggle: () => void;
}

export default function TodoPreview({
  modalToggle,
  ...todoInfo
}: ITodoPreviewProps) {
  return (
    <Container>
      <TodoStatus
        status={todoInfo.status}
        todoId={todoInfo.id}
        modalToggle={modalToggle}
      />
      <Content>{todoInfo.title}</Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Content = styled.p`
  margin: 0;
`;
