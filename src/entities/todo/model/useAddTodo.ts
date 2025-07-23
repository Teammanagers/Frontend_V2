import { useState } from 'react';

// 투두 추가 버튼 클릭 상태 및 입력값 관리
export const useAddTodo = () => {
  const [isAddTodoClicked, setIsAddTodoClicked] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddTodoClick = () => {
    setIsAddTodoClicked((prev) => !prev);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return {
    inputValue,
    setInputValue,
    handleInputChange,
    isAddTodoClicked,
    handleAddTodoClick,
  };
};
