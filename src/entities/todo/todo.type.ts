type ButtonType = 'menu' | 'alarm' | 'none';

type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

interface Tag {
  id: number;
  name: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  useYn: 'Y' | 'N';
}

interface TodoItem {
  id: number;
  title: string;
  status: Status;
}

interface MemberTodos {
  teamMemberId: number;
  name: string;
  tagList: Tag[];
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
  Tag,
  TodoItem,
  ButtonType,
  MemberTodos,
  ITeamProgressStatus,
  ITeamTodoResponse,
};
