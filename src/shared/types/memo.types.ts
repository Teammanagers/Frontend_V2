import { memoSizes } from '@/widgets/memo/memo.constants.ts';

// shared/memo/types/memo.types.ts -> 공통적으로 여러곳에서 사용

export interface MemoType {
  id: number;
  title: string;
  tags: string[];
  content: string;
  isFixed: boolean;
}

export interface MemoProps {
  size: keyof typeof memoSizes;
  memo: MemoType;
  onDeleteRequest: (id: number) => void;
  onMoveRequest: (id: number) => void;
}

export interface FolderType {
  id: number;
  title: string;
}

export interface FolderProps {
  folder: FolderType;
  onFolderClick?: (folderId: number) => void;
  onDeleteRequest: (id: number) => void;
  onEditRequest?: (folder: FolderType) => void;
}
