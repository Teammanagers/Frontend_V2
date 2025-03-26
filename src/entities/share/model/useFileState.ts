import { useState } from 'react';

export const useFileState = () => {
  const [hasFiles, setHasFiles] = useState(false);

  const addFile = () => setHasFiles(true);
  const removeFile = () => setHasFiles(false);

  return { hasFiles, addFile, removeFile };
};
