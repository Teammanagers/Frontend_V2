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

interface ITeamProgressStatus {
  label: string;
  count?: number;
}

interface ITeamTodoResponse {
  completed: number;
  in_progress: number;
  pending: number;
  teamTodoList: ITeamMemberTodo[];
}

export type {
  Status,
  ITodoInfo,
  ButtonType,
  ITeamMemberTodo,
  ITeamProgressStatus,
  ITeamTodoResponse,
};
