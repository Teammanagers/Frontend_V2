import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonType = 'menu' | 'alarm' | 'none';

type Status = 'TODO' | 'PROCEEDING' | 'COMPLETED';

interface ITodo {
  children: ReactNode;
  buttonType: ButtonType;
}

interface ItodoInfo {
  id: number;
  title: string;
  status: Status;
}

interface ITeamMemberTodo {
  teamMemberId: number;
  name: string;
  tagList: string[];
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
  ITeamMemberTodo,
  ITodoStatus,
  IProgressStatusBadge,
};
