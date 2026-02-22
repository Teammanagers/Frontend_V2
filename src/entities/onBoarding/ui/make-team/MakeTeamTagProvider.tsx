import { createContext, ReactNode, useContext, useEffect, useRef } from 'react';
import { useTags } from '@/shared/hooks/useTags';
import { TeamTag } from '@/shared/types/tag.types.ts';

interface MakeTeamTagContextType {
  isTagFull: boolean;
  tags: TeamTag[];
  showTagInput: boolean;
  setShowTagInput: (show: boolean) => void;
  newTag: string;
  handleChangeTag: (value: string) => void;
  handleAddTag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleRMTag: (index: number) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const MakeTeamTagContext = createContext<MakeTeamTagContextType | null>(null);

interface MakeTeamTagProviderProps {
  children: ReactNode;
}

export default function MakeTeamTagProvider({
  children,
}: MakeTeamTagProviderProps) {
  const {
    isTagFull,
    tags,
    setTags,
    showTagInput,
    setShowTagInput,
    newTag,
    handleChangeTag,
    handleAddTag,
  } = useTags({ initialTags: [] });

  useEffect(() => {
    if (showTagInput) {
      inputRef?.current?.focus();
    }
  }, [showTagInput]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleRMTag = (index: number) => {
    setTags(tags.filter((_, idx) => idx !== index));
  };

  return (
    <MakeTeamTagContext.Provider
      value={{
        isTagFull,
        tags,
        showTagInput,
        setShowTagInput,
        newTag,
        handleChangeTag,
        handleAddTag,
        handleRMTag,
        inputRef,
      }}
    >
      {children}
    </MakeTeamTagContext.Provider>
  );
}

export function useTagContext() {
  const context = useContext(MakeTeamTagContext);
  if (!context) {
    throw new Error('useTagContext must be used within TagProvider');
  }
  return context;
}
