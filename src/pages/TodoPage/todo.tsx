import TeamProgres from '@/widgets/todo/TeamProgres';
import { TodoList } from '@/widgets/todo/TodoList';
import styled from 'styled-components';

export function TodoPage() {
  return (
    <Container>
      <TeamProgres />
      <TodoList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: clamp(16px, 4.6875vw - 44px, 46px); // 16px(1280) ~ 46px (1920)
  width: 100%;
  height: 100vh;
  background-color: #f9fbff;
  margin: 0;
`;
