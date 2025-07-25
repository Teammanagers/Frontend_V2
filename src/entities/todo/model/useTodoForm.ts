import { useEffect, useState } from 'react';

// 투두 Input 폼 트리거 버튼 클릭 상태 및 입력값 관리
export const useTodoForm = () => {
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleTriggerBtnClick = () => {
    setIsInputActive((prev) => !prev);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 입력값 초기화
      setIsInputActive(false);
    };
  }, []);

  return {
    inputValue,
    setInputValue,
    handleInputChange,
    isInputActive,
    setIsInputActive,
    handleTriggerBtnClick,
  };
};
