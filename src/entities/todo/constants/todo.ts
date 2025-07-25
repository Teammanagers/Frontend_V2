import { Status } from '../todo.type';

const statusLabel = [
  { title: '전체', count: 40 },
  { title: '진행 전', count: 10 },
  { title: '진행중', count: 20 },
  { title: '완료', count: 10 },
];

// status -> option 변경 상태 매핑
const STATUS_TO_OPTION: { [key in Status]: number } = {
  PENDING: 1,
  IN_PROGRESS: 2,
  COMPLETED: 0,
};

export { statusLabel, STATUS_TO_OPTION };
