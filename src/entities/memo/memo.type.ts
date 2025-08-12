import { FolderType, MemoType } from '@/shared/types/memo.types.ts';
import { ModalProps } from '@/shared/types/modal.types.ts';

// entities/memo/memo.type.ts -> Memo 도메인에서만 사용되는 type

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
  id: number;
  name: string;
  parentId: number;
}

export interface FolderModalProps extends ModalProps {
  mode: 'create' | 'edit';
  currentName?: string;
  folderId?: number;
  parentId: number;
}

export interface AddModalProps extends ModalProps {
  onAddFolder: () => void;
  canAddFolder?: boolean;
  parentId: number;
}

export interface MoveModalProps extends ModalProps {
  memoId: number;
  parentId: number;
}

export interface Target {
  type: 'memo' | 'folder';
  id: number;
  title: string;
}

export interface MemoListViewUIState {
  deleteTarget: Target | null;
  moveTarget: Target | null;
  openAddModal: boolean;
  openFolderModal: boolean;
  editFolder: FolderType | null;
}

export interface MemoListViewHandlers {
  handleOpenAddModal: () => void;
  handleAddFolder: () => void;
  closeDeleteModal: () => void;
  closeMoveModal: () => void;
  closeAddModal: () => void;
  closeFolderModal: () => void;
  handleDeleteRequest: (target: Target) => void;
  handleMoveRequest: (target: Target) => void;
  handleEditFolderRequest: (folder: { id: number; title: string }) => void;
}

export interface MemoListViewProps {
  memos: MemoType[];
  folders: FolderType[];
  uiState: MemoListViewUIState;
  handlers: MemoListViewHandlers;
  onFolderClick?: (folderId: number) => void;
  currentFolderId: number;
  canAddFolder?: boolean;
}

export interface MemoAddBtnProps {
  onClick: () => void;
}
