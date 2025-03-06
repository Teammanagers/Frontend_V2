import { ReactNode } from 'react';
import styled from 'styled-components';
import { ButtonState, ITodo } from '../todo.type';
import { Button } from './Button';
import { TodoStatus } from './TodoStatus';
import { ActionDropdown } from './ActionDropdown';

/**
 * Todo 컴포넌트는 할 일 항목을 렌더링합니다.
 *
 * @param {ReactNode} children - 할 일 항목의 내용.
 * @param {ButtonState} buttonState - 버튼의 상태를 나타내는 값 ('menu', 'alarm', 'none').
 */

function Todo({ children, buttonState }: ITodo) {
  const buttonComponents: { [key in ButtonState]: ReactNode } = {
    menu: <ActionDropdown />,
    alarm: <Button>깨우기</Button>,
    none: null,
  };

  return (
    <TodoContainer>
      <InnerWrapper>
        <ContentWrapper>
          <TodoStatus />
          <Content>{children}</Content>
        </ContentWrapper>

        {buttonComponents[buttonState]}
      </InnerWrapper>
    </TodoContainer>
  );
}

export { Todo };

const TodoContainer = styled.li`
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
