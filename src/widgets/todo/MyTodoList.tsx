import styled from 'styled-components';
import FallbackCard from '@/entities/main/ui/FallbackCard';
import { useMyTodoList } from '@/entities/todo/model/useTodoQueries';
import { Todo } from '@/features/todo/ui/Todo';
import Skeleton from '@/shared/components/skeleton/Skeleton';

function MyTodoList() {
  const { data: todoList, isPending, isSuccess, isError } = useMyTodoList();

  if (isPending) return <Skeleton width={518} height={222} />;
  if (isError)
    return <FallbackCard>투두리스트를 불러올 수 없습니다.</FallbackCard>;

  return (
    <>
      {isSuccess && (
        <MyTodoListWrapper>
          <MyTodoTitle>내가 해야할 일</MyTodoTitle>

          <TodosWrapper>
            {todoList?.todoList.length === 0 && (
              <p>아직 생성된 투두가 없습니다.</p>
            )}
            {todoList?.todoList.map((todo, idx) => (
              <TodoWrapper key={`todo-${idx}`}>
                <Todo buttonType="menu" {...todo} />
              </TodoWrapper>
            ))}
          </TodosWrapper>
        </MyTodoListWrapper>
      )}
    </>
  );
}

export { MyTodoList };

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
