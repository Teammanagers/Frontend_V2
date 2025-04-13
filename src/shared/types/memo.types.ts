import { memoSizes } from '@/widgets/memo/memo.constants.ts';

export interface MemoType {
  id: number;
  title: string;
  tags: string[];
  content: string;
}

export interface MemoProps {
  size: keyof typeof memoSizes;
  memo: MemoType;
  onDeleteRequest: (id: number) => void;
  onMoveRequest: (id: number) => void;
}
