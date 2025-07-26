import styled from 'styled-components';
import { TodoStatus } from '@/entities/todo/ui/TodoStatus';
import { ITodoInfo } from '@/entities/todo/todo.type';
import { useTodoStatus } from '../model/useTodoStatus';

interface ITodoPreviewProps extends ITodoInfo {
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
      <TodoStatus
        todoStatus={todoStatus}
        todoId={todoInfo.id}
        modalToggle={modalToggle}
        onClick={handleTodoStatus}
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
