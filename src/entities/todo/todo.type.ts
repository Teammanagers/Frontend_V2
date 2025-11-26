type ButtonType = 'menu' | 'alarm' | 'none';

type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

interface TodoItem {
  id: number;
  title: string;
  status: Status;
}

interface MemberTodos {
  teamMemberId: number;
  name: string;
  tagList: string[];
  todoList: TodoItem[];
}

interface ITeamProgressStatus {
  label: string;
  count?: number;
}

interface ITeamTodoResponse {
  completed: number;
  in_progress: number;
  pending: number;
  myTeamMemberId: number;
  teamTodoList: MemberTodos[];
}

export type {
  Status,
  TodoItem,
  ButtonType,
  MemberTodos,
  ITeamProgressStatus,
  ITeamTodoResponse,
};
