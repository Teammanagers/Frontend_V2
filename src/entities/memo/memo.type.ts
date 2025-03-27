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
  title: string;
}

export interface FolderModalProps {
  mode: 'create' | 'edit';
  currentName?: string;
}
