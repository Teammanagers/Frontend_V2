export interface FileInfo {
  id: number;
  fileName: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  author: string;
  role: string;
}

export interface IFileStateContextValue {
  files: File[];
  hasFiles: boolean;
  addFile: (file: File) => void;
  removeFile: (fileName: string) => void;
}

export interface IFileStateProviderProps {
  children: React.ReactNode;
}
