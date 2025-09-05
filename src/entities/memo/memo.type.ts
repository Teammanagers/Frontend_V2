import { FolderType, MemoType } from '@/shared/types/memo.types.ts';

// entities/memo/memo.type.ts -> Memo 도메인에서만 사용되는 type

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
  isEmpty: boolean;
  isRootFolder: boolean;
  uiState: MemoListViewUIState;
  handlers: MemoListViewHandlers;
  onFolderClick?: (folderId: number) => void;
  currentFolderId: number;
  canAddFolder?: boolean;
}

export interface MemoAddBtnProps {
  onClick: () => void;
}
