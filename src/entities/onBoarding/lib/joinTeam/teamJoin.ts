import { useState } from 'react';

import useToggle from '@/shared/hooks/action/useToggle';
import { Tag } from '@/shared/types/tag.types';

export interface SearchResult {
  img: string;
  teamName: string;
  tags: Tag[];
}

export const JoinTeam = () => {
  const [isShowResult, setIsShowResult] = useState<boolean>(false);

  const { isOpen, toggle } = useToggle();

  return {
    isShowResult,
    setIsShowResult,
    isOpen,
    toggle,
  };
};
