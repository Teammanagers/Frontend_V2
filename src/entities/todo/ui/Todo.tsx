import styled from 'styled-components';
import { ReactNode } from 'react';
import { ButtonType, ITodo } from '../todo.type';
import { Button } from './Button';
import { TodoStatus } from './TodoStatus';
import { ActionDropdown } from '../../../shared/components/dropdown/ActionDropdown';
import useToggle from '@/shared/hooks/action/useToggle';

/**
 * Todo 컴포넌트는 할 일 항목을 렌더링합니다.
 *
 * @param {ReactNode} children - 할 일 항목의 내용.
 * @param {ButtonState} buttonType - 버튼의 상태를 나타내는 값 ('menu', 'alarm', 'none').
 */

function Todo({ children, buttonType }: ITodo) {
  const { isOpen, setIsOpen, toggle } = useToggle();

  const handleMenuAction = (menu: string) => {
    if (menu === '수정') {
      // 수정 로직
    } else if (menu === '삭제') {
      // 삭제 로직
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
          <Content>{children}</Content>
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
