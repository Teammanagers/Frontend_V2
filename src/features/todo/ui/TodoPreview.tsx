import styled from 'styled-components';
import { TodoItem } from '@/entities/todo/todo.type';
import { TodoStatus } from '@/entities/todo/ui/TodoStatus';
import { useTodoStatus } from '../model/useTodoStatus';

interface ITodoPreviewProps extends TodoItem {
  modalToggle: () => void;
}

export default function TodoPreview({
  modalToggle,
  ...todoInfo
}: ITodoPreviewProps) {
  const { todoStatus, handleTodoStatus } = useTodoStatus(
    todoInfo.status,
    todoInfo.id,
    modalToggle,
  );

  return (
    <Container>
      <TodoStatus todoStatus={todoStatus} onClick={handleTodoStatus} />
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
