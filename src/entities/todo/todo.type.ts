import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonType = 'menu' | 'alarm' | 'none';

type Status = 'TODO' | 'PROCEEDING' | 'COMPLETED';

interface ITodo {
  children: ReactNode;
  buttonType: ButtonType;
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

interface ITodoStatus extends ButtonHTMLAttributes<HTMLButtonElement> {
  status?: Status;
}

interface IProgressStatusBadge {
  title: string;
  count: number;
}

export type {
  Status,
  ITodo,
  ButtonType,
  ITeamTodoList,
  ITodoStatus,
  IProgressStatusBadge,
};
