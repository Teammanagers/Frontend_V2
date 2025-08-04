import { memoSizes } from '@/widgets/memo/memo.constants.ts';

// shared/memo/types/memo.types.ts -> Memo 컴포넌트 및 서버에서 받아오는 memo type들 (공통적으로 여러곳에서 사용)

// UI
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

// 서버 데이터
export interface MemoResponse {
  memoDto: {
    id: number;
    title: string;
    content: string;
    isFixed: boolean;
    folderId: number;
  };
  memoTagList: {
    id: number;
    name: string;
  }[];
}

export interface FolderDto {
  id: number;
  name: string;
  depth: number;
  parentId: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  useYn: string;
}

export interface FolderResponse {
  folderDto: FolderDto;
}
