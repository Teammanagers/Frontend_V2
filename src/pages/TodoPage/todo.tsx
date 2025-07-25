import useTodoQuries from '@/features/todo/model/useTodoQuries';
import TeamProgres from '@/widgets/todo/TeamProgres';
import { TodoList } from '@/widgets/todo/TodoList';
import styled from 'styled-components';

export function TodoPage() {
  const { useTeamTodoQuery } = useTodoQuries();
  const { data, isSuccess } = useTeamTodoQuery();

  console.log('data', data);

  return (
    <Container>
      <TeamProgres />
      {isSuccess && <TodoList teamTodoData={data.teamTodoList} />}
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
