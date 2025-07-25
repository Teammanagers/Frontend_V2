type ButtonType = 'menu' | 'alarm' | 'none';

type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

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

interface IProgressStatusBadge {
  title: string;
  count: number;
}

export type {
  Status,
  ITodoInfo,
  ButtonType,
  ITeamMemberTodo,
  IProgressStatusBadge,
};
