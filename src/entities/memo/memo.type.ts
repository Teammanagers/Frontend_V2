import { memoSizes } from '@/widgets/memo/memo.constants.ts';

export interface MemoFormProps {
  initialTitle?: string;
  initialContent?: string;
  initialTags?: { name: string }[];
  onSubmit: (title: string, content: string, tags: { name: string }[]) => void;
  onBack?: () => void;
  submitButtonText: string;
  onDelete?: () => void; // EditMemo에서 사용
  showDeleteButton?: boolean;
}

export interface DeleteModalProps {
  type: 'folder' | 'memo';
  name: string;
  onClose: () => void;
}

export interface FolderModalProps {
  mode: 'create' | 'edit';
  currentName?: string;
}

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
}
