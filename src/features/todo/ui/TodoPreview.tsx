import styled from 'styled-components';
import { TodoItem } from '@/entities/todo/todo.type';
import { TodoStatus } from '@/entities/todo/ui/TodoStatus';

interface TodoPreviewProps {
  todo: TodoItem;
  modalToggle: () => void;
  isMe: boolean;
}

export default function TodoPreview({
  todo,
  modalToggle,
  isMe,
}: TodoPreviewProps) {
  return (
    <Container>
      <TodoStatus todo={todo} modalToggle={modalToggle} isMe={isMe} />
      <Content>{todo.title}</Content>
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
