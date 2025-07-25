import { ButtonHTMLAttributes } from 'react';

type ButtonType = 'menu' | 'alarm' | 'none';

type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

interface ITodo extends ITodoInfo {
  buttonType: ButtonType;
}

interface ITodoInfo {
  id: number;
  title: string;
  status: Status;
}

interface ITeamMemberTodo {
  teamMemberId: number;
  name: string;
  tagList: string[];
  todoList: ITodoInfo[];
}

interface ITodoStatus extends ButtonHTMLAttributes<HTMLButtonElement> {
  status?: Status;
  modalToggle: () => void;
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
