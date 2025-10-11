import styled from 'styled-components';
// import { Todo } from '@/features/todo/ui/Todo';

function TodoList() {
  return (
    <Container>
      <MyTodoListWrapper>
        <MyTodoTitle>내가 해야할 일</MyTodoTitle>

        <TodosWrapper>
          {Array.from({ length: 10 }).map((_, idx) => (
            <TodoWrapper key={`todo-${idx}`}>
              {/* <Todo buttonType="menu">내가 해야할 일</Todo> */}
            </TodoWrapper>
          ))}
        </TodosWrapper>
      </MyTodoListWrapper>
    </Container>
  );
}

export { TodoList };

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const MyTodoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 518px;
  height: 222px;
  border: 1px solid ${({ theme }) => theme.colors.subLightBlue};
  padding: 16px 16px 14px 16px;
  border-radius: 8px;
`;

const MyTodoTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;

const TodosWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 9px;
  overflow: auto;
`;

const TodoWrapper = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
`;
