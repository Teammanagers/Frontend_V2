import { createContext, useState } from 'react';
import type {
  IFileStateContextValue,
  IFileStateProviderProps,
} from '../share.type';

export const FileStateContext = createContext<IFileStateContextValue | null>(
  null,
);

export function FileStateProvider({ children }: IFileStateProviderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const addFile = (file: File) => {
    setFiles((prev) => [...prev, file]);
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  const hasFiles = files.length > 0;

  return (
    <FileStateContext.Provider value={{ files, hasFiles, addFile, removeFile }}>
      {children}
    </FileStateContext.Provider>
  );
}
