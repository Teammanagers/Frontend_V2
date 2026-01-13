import styled from 'styled-components';
import { Theme } from '@/app/styles/theme';
import { transformTeamProgress } from '@/entities/todo/lib/transformTeamProgress';
import useTodoQuries from '@/features/todo/model/useTodoQuries';
import LoadingSpinner from '@/shared/components/loadingSpinner/loadingSpinner';
import TeamProgress from '@/widgets/todo/TeamProgress';
import { TodoList } from '@/widgets/todo/TodoList';

export function TodoPage() {
  const { useTeamTodoQuery } = useTodoQuries();
  const { data, isPending, isSuccess } = useTeamTodoQuery();

  const teamProgress = data ? transformTeamProgress(data) : [];

  return (
    <Container>
      <TeamProgress
        teamProgress={teamProgress}
        isPending={isPending}
        isSuccess={isSuccess}
      />

      {isPending && (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      )}
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
  padding: 74px 0 74px 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 900px;
  width: 70vw;
  height: 552px;
  border-radius: 10px;
  background-color: ${Theme.colors.white};
`;
