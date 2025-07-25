import styled from 'styled-components';
import { ReactNode } from 'react';
import { ButtonType, ITodo } from '@/entities/todo/todo.type';
import { Button } from '@/entities/todo/ui/Button';
import { TodoStatus } from '@/entities/todo/ui/TodoStatus';
import { ActionDropdown } from '@/shared/components/dropdown/ActionDropdown';
import useToggle from '@/shared/hooks/action/useToggle';
import useTodoQuries from '../model/useTodoQuries';
import { TEAM_ID } from '@/shared/config/constants/team.constants';
import { ImageUploadModal } from './ImageUploadModal';
import { useTodoForm } from '@/entities/todo/model/useTodoForm';
import TodoForm from './TodoForm';

function Todo({ buttonType, ...todoInfo }: ITodo) {
  // api 호출
  const { useDeleteTodoMutation } = useTodoQuries(TEAM_ID);
  const { mutate: deleteTodo } = useDeleteTodoMutation(todoInfo.id);

  // 드롭다운, 모달 토글 훅
  const {
    isOpen: isDropdownOpen,
    setIsOpen: setDropdownIsOpen,
    toggle: dropdownToggle,
  } = useToggle();
  const { isOpen: isModalOpen, toggle: modalToggle } = useToggle();

  const { isInputActive, setIsInputActive, handleTriggerBtnClick } =
    useTodoForm();

  const handleMenuAction = (menu: string) => {
    if (menu === '수정') {
      handleTriggerBtnClick();
    } else if (menu === '삭제') {
      deleteTodo();
    }
    dropdownToggle();
  };

  const buttonComponents: { [key in ButtonType]: ReactNode } = {
    menu: (
      <ActionDropdown
        isOpen={isDropdownOpen}
        setIsOpen={setDropdownIsOpen}
        toggle={dropdownToggle}
        action={handleMenuAction}
        menus={['수정', '삭제']}
      />
    ),
    alarm: <Button>깨우기</Button>,
    none: null,
  };

  return (
    <>
      <TodoContainer>
        <InnerWrapper>
          {/* 등록/수정 모드에 따른 컴포넌트 조건부 렌더링 */}
          {isInputActive ? (
            <TodoForm
              mode="edit"
              id={todoInfo.id}
              initialValue={todoInfo.title}
              setIsInputActive={setIsInputActive}
            />
          ) : (
            <ContentWrapper>
              <TodoStatus modalToggle={modalToggle} />
              <Content>{todoInfo.title}</Content>
            </ContentWrapper>
          )}
          {isInputActive || buttonComponents[buttonType]}
        </InnerWrapper>
      </TodoContainer>

      {/* 이미지 업로드 모달 */}
      <ImageUploadModal isOpen={isModalOpen} toggle={modalToggle} />
    </>
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
