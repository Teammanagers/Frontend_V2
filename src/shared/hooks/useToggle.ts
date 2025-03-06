import { useCallback, useState } from 'react';

const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, setIsOpen, toggle };
};

export default useToggle;
