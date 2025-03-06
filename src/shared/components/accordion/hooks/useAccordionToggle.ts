import { useRef, useState } from 'react';

export const useAccordionToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const toggleAccrodion = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    // 열려있는 상태면 닫기
    if (parentRef.current!.clientHeight > 0) {
      parentRef.current!.style.height = '0';
    }
    // 닫혀있는 상태면 열기
    else {
      parentRef.current!.style.height = `${childRef.current!.clientHeight}px`;
    }

    setIsOpen((prev) => !prev);
  };

  return { isOpen, parentRef, childRef, toggleAccrodion };
};
