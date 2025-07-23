import styled from 'styled-components';
import { ReactNode } from 'react';
import { ButtonType, ITodo } from '../../../entities/todo/todo.type';
import { Button } from '../../../entities/todo/ui/Button';
import { TodoStatus } from '../../../entities/todo/ui/TodoStatus';
import { ActionDropdown } from '../../../shared/components/dropdown/ActionDropdown';
import useToggle from '@/shared/hooks/action/useToggle';
import useTodoQuries from '../model/useTodoQuries';
import { TEAM_ID } from '@/shared/config/constants/team.constants';

function Todo({ buttonType, ...todoInfo }: ITodo) {
  const { useDeleteTodoMutation } = useTodoQuries(TEAM_ID);
  const { mutate: deleteTodo } = useDeleteTodoMutation(todoInfo.id);

  const { isOpen, setIsOpen, toggle } = useToggle();

  const handleMenuAction = (menu: string) => {
    if (menu === '수정') {
      // 수정 로직
    } else if (menu === '삭제') {
      // 삭제 로직
      deleteTodo();
    }
    toggle();
  };

  const buttonComponents: { [key in ButtonType]: ReactNode } = {
    menu: (
      <ActionDropdown
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggle={toggle}
        action={handleMenuAction}
        menus={['수정', '삭제']}
      />
    ),
    alarm: <Button>깨우기</Button>,
    none: null,
  };

  return (
    <TodoContainer>
      <InnerWrapper>
        <ContentWrapper>
          <TodoStatus />
          <Content>{todoInfo.title}</Content>
        </ContentWrapper>

        {buttonComponents[buttonType]}
      </InnerWrapper>
    </TodoContainer>
  );
}

export { Todo };

const TodoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: white;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Content = styled.p`
  margin: 0;
`;
