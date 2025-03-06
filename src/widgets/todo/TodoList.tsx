import styled from 'styled-components';
import mocks from '@/entities/todo/mocks/get-todo-list.json';

import { Accordion } from '@/shared/components/accordion/Accordion';
import { ITeamTodoList } from '@/entities/todo/todo.type';
import { Todo } from '@/entities/todo/ui';

export function TodoList() {
  const mockData = mocks.result.teamTodoList as ITeamTodoList[];
  const myTodoId = mocks.result.ownerTeamManageId;

  return (
    // 투두 리스트 전체를 덮는 Container 컴포넌트
    <Container>
      {/* 팀원별 투두 리스트(아코디온)들을 조절하는 Wrapper 레이아웃 컴포넌트 */}
      <TodosWrapper>
        {mockData.map((teamMember) => (
          <Accordion
            title={teamMember.name}
            tagList={teamMember.roleTagList.map((tag) => tag.name)}
          >
            {teamMember.todoList.map((todo) => (
              <Todo
                buttonState={
                  // 내 투두이면 'menu', 아니면 'alarm' 버튼을 렌더링
                  myTodoId === teamMember.teamManageId ? 'menu' : 'alarm'
                }
              >
                {todo.title}
              </Todo>
            ))}
          </Accordion>
        ))}
      </TodosWrapper>
    </Container>
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
