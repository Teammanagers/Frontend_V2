import { Status } from '../todo.type';

// status -> option 변경 상태 매핑
const STATUS_TO_OPTION: { [key in Status]: number } = {
  PENDING: 1,
  IN_PROGRESS: 2,
  COMPLETED: 0,
};

export { STATUS_TO_OPTION };
