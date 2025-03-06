import { ReactNode } from 'react';

type ButtonState = 'menu' | 'alarm' | 'none';

type Status = 'TODO' | 'PROCEEDING' | 'COMPLETED';

interface ITodo {
  children: ReactNode;
  buttonState: ButtonState;
}

interface IRoleTag {
  tagId: number;
  name: string;
}

interface ItodoInfo {
  todoId: number;
  title: string;
  status: Status;
}

interface ITeamTodoList {
  teamManageId: number;
  name: string;
  roleTagList: IRoleTag[];
  todoList: ItodoInfo[];
}

export type { Status, ITodo, ButtonState, ITeamTodoList };
