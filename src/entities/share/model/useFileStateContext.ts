import { useContext } from 'react';
import { FileStateContext } from './FileStateContext';

export const useFileStateContext = () => {
  const context = useContext(FileStateContext);
  if (!context) {
    throw new Error(
      'useFileStateContext must be used within a FileStateProvider',
    );
  }
  return context;
};
