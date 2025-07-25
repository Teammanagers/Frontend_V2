import styled from 'styled-components';
import { ITeamMemberTodo } from '@/entities/todo/todo.type';
import MemberTodoAccordion from '@/widgets/todo/MemberTodoAccordion';

export function TodoList({
  teamTodoData,
}: {
  teamTodoData: ITeamMemberTodo[];
}) {
  // 투두 리스트 전체를 덮는 Container 컴포넌트
  return (
    <Container>
      {/* 팀원별 투두 리스트(아코디언)들을 조절하는 Wrapper 레이아웃 컴포넌트 */}
      <TodosWrapper>
        {teamTodoData.map((teamMember: ITeamMemberTodo) => (
          <MemberTodoAccordion teamMember={teamMember} />
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
