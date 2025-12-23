import { useEffect } from 'react';
import styled from 'styled-components';
import { useTodoForm } from '@/entities/todo/model/useTodoForm';
import { Button } from '@/entities/todo/ui';
import TodoInput from '@/entities/todo/ui/TodoInput';
import useTodoQuries from '@/features/todo/model/useTodoQuries';

interface IAddTodoFormProps {
  mode: 'add' | 'edit';
  todoId?: number;
  initialValue?: string; // 선택적으로 초기값을 받을 수 있도록
  setIsInputActive?: React.Dispatch<React.SetStateAction<boolean>>; // 수정 모드에서 입력 활성화 상태를 변경할 수 있는 함수
}

// 투두 -> [수정, 등록] 모드 변환 컴포넌트
export default function TodoForm({
  mode,
  todoId,
  initialValue,
  setIsInputActive,
}: IAddTodoFormProps) {
  const { inputValue, setInputValue, handleInputChange } = useTodoForm();

  const { useCreateTodoMutation, useEditTodoMutation } = useTodoQuries();
  const { mutate: createTodo } = useCreateTodoMutation();
  const { mutate: editTodo } = useEditTodoMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // 빈 입력 방지

    if (mode === 'add') {
      createTodo({ title: inputValue }); // 투두 생성 API 요청
      setInputValue('');
    } else if (mode === 'edit' && todoId) {
      editTodo({ todoId, data: { title: inputValue } }); // 투두 수정 API 요청

      if (setIsInputActive) setIsInputActive(false); // 입력 폼 닫기
    }
  };

  // 수정 모드일 때 초기값 설정
  useEffect(() => {
    if (mode === 'edit' && initialValue) setInputValue(initialValue);
  }, [mode, initialValue, setInputValue]);

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <TodoInput
          value={inputValue}
          onChange={handleInputChange}
          placeholder={'할 일을 입력해주세요'}
          maxLength={30}
        />
        <Button variant={mode === 'add' ? 'filled' : 'outlined'}>
          {mode === 'add' ? '등록' : '수정'}
        </Button>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
  width: 100%;
`;
