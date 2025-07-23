import styled from 'styled-components';
import { Accordion } from '@/shared/components/accordion';
import TodoProvider from '@/app/providers/TodoContext';
import useToggle from '@/shared/hooks/action/useToggle';
import { ImageUploadModal } from './ImageUploadModal';
import useTodoQuries from '@/features/todo/model/useTodoQuries';
import { ITeamMemberTodo } from '@/entities/todo/todo.type';
import AddTodoForm from '@/features/calendar/ui/AddTodoForm';
import {
  OWNER_TEAMMANAGE_ID,
  TEAM_ID,
} from '@/shared/config/constants/team.constants';
import { Todo } from '@/features/todo/ui/Todo';

export function TodoList() {
  const { useTeamTodoQuery } = useTodoQuries(TEAM_ID);
  const { data, isSuccess } = useTeamTodoQuery();

  const { isOpen, toggle } = useToggle();

  return (
    <TodoProvider
      value={{
        isOpen,
        toggle,
      }}
    >
      {/* // 투두 리스트 전체를 덮는 Container 컴포넌트 */}
      <Container>
        {/* 팀원별 투두 리스트(아코디언)들을 조절하는 Wrapper 레이아웃 컴포넌트 */}
        <TodosWrapper>
          {isSuccess &&
            data.teamTodoList.map((teamMember: ITeamMemberTodo) => (
              <Accordion
                key={teamMember.teamMemberId}
                title={teamMember.name}
                tagList={teamMember.tagList.map((tag: string) => tag)}
              >
                {teamMember.todoList.map((todo, idx) => (
                  <Todo
                    key={`${teamMember.teamMemberId}-todo-${todo.id}-${idx}`}
                    buttonType={
                      // 내 투두이면 'menu', 아니면 'alarm' 버튼을 렌더링
                      teamMember.teamMemberId === OWNER_TEAMMANAGE_ID
                        ? 'menu'
                        : 'alarm'
                    }
                    {...todo}
                  />
                ))}

                {/* 투두 추가 폼 */}
                <AddTodoForm teamMemberId={teamMember.teamMemberId} />
              </Accordion>
            ))}
        </TodosWrapper>
      </Container>

      <ImageUploadModal isOpen={isOpen} toggle={toggle} />
    </TodoProvider>
  );
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-width: 900px;
  width: 70vw;
  height: 552px;
  padding: 32px 0;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #ffffff;
  overflow: auto;
`;

const TodosWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  row-gap: 36px;
  column-gap: 24px;
  box-sizing: border-box;

  // width: 88%;
  width: 788px;
  margin: 0 auto;

  @media (min-width: 1920px) {
    width: 1194px;
  }
`;
