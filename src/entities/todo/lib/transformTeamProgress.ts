import { ITeamTodoResponse } from '../todo.type';

export function transformTeamProgress(data: ITeamTodoResponse) {
  return [
    { label: '전체', count: data.pending + data.in_progress + data.completed },
    { label: '진행 전', count: data.pending },
    { label: '진행 중', count: data.in_progress },
    { label: '완료', count: data.completed },
  ];
}
