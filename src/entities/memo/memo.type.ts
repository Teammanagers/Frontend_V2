import { ModalProps } from '@/shared/types/modal.types.ts';

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

export interface DeleteModalProps extends ModalProps {
  type: 'folder' | 'memo';
  name: string;
}

export interface FolderModalProps extends ModalProps {
  mode: 'create' | 'edit';
  currentName?: string;
}

export interface AddModalProps extends ModalProps {
  onAddFolder: () => void;
}

export interface FolderType {
  id: number;
  title: string;
}

export interface FolderProps {
  folder: FolderType;
  onDeleteRequest: (id: number) => void;
}

export interface Target {
  type: 'memo' | 'folder';
  id: number;
  title: string;
}
