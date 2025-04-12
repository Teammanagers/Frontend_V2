import { useState } from 'react';
import logo from '@/shared/assets/common/logo.svg?url';
import useToggle from '@/shared/hooks/action/useToggle';
import { Tag } from '@/shared/types/tag.types';

export interface SearchResult {
  img: string;
  teamName: string;
  tags: Tag[];
}

export const JoinTeam = () => {
  const [isShowResult, setIsShowResult] = useState<boolean>(false);
  const ISRESULTNULL = false;
  const { isOpen, toggle } = useToggle();
  const MOCKTEAM: SearchResult = {
    img: logo,
    teamName: 'UMC 6th 팀매니저',
    tags: [{ name: '기획자' }, { name: '기획자' }],
  };
  return {
    isShowResult,
    setIsShowResult,
    ISRESULTNULL,
    isOpen,
    toggle,
    MOCKTEAM,
  };
};
