import styled from 'styled-components';
import { useAddTodo } from '@/entities/todo/model/useAddTodo';
import { Button } from '@/entities/todo/ui';
import AddTodoButton from '@/entities/todo/ui/AddTodoButton';
import TodoInput from '@/entities/todo/ui/TodoInput';
import useTodoQuries from '@/features/todo/model/useTodoQuries';
import { TEAM_ID } from '@/shared/config/constants/team.constants';

export default function AddTodoForm({
  teamMemberId,
}: {
  teamMemberId: number;
}) {
  const {
    inputValue,
    setInputValue,
    handleInputChange,
    isAddTodoClicked,
    handleAddTodoClick,
  } = useAddTodo();

  const { useCreateTodoMutation } = useTodoQuries(TEAM_ID);
  const { mutate: createTodo } = useCreateTodoMutation(teamMemberId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo({ title: inputValue }); // 투두 생성 API 요청
    setInputValue('');
  };

  return (
    <>
      {isAddTodoClicked ? (
        <FormContainer onSubmit={handleSubmit}>
          <TodoInput
            value={inputValue}
            onChange={handleInputChange}
            placeholder="할 일을 입력해주세요"
          />
          <Button>등록</Button>
        </FormContainer>
      ) : (
        <AddTodoButton onClick={handleAddTodoClick} />
      )}
    </>
  );
}

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
`;
