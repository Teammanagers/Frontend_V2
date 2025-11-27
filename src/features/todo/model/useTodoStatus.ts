import { useState } from 'react';
import { STATUS_TO_OPTION } from '@/entities/todo/constants/todo';
import { Status } from '@/entities/todo/todo.type';
import useTodoQuries from './useTodoQuries';

export const useTodoStatus = (
  status: Status,
  todoId: number,
  modalToggle: () => void,
) => {
  const { useEditTodoStatusMutation } = useTodoQuries();
  const { mutate: editTodoStatus } = useEditTodoStatusMutation(todoId);

  const [todoStatus, setTodoStatus] = useState<Status>(status);

  const handleTodoStatus = () => {
    const option = STATUS_TO_OPTION[status]; // 상태에 따른 option 값 가져오기
    editTodoStatus(option); // 상태 변경 API 호출

    // ui 상태 변경
    if (todoStatus === 'PENDING') {
      setTodoStatus('IN_PROGRESS');
    } else if (todoStatus === 'IN_PROGRESS') {
      setTodoStatus('COMPLETED');
      modalToggle(); // 이미지 업로드 모달 열기
    } else if (todoStatus === 'COMPLETED') {
      setTodoStatus('PENDING');
    }
  };

  return { todoStatus, handleTodoStatus, modalToggle };
};
