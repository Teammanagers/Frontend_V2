import { useEffect, useRef } from 'react';
import { useTags } from '@/shared/hooks/useTags';

export const TagFormLib = () => {
  const {
    tags,
    showTagInput,
    setShowTagInput,
    newTag,
    setNewTag,
    handleAddTag,
    setTags,
  } = useTags({
    initialTags: [],
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleRMTag = (index: number) => {
    setTags(tags.filter((_, idx) => idx !== index));
  };

  useEffect(() => {
    if (showTagInput) {
      inputRef?.current?.focus();
    }
  }, [showTagInput]);

  return {
    tags,
    showTagInput,
    setShowTagInput,
    newTag,
    setNewTag,
    handleAddTag,
    handleRMTag,
    inputRef,
  };
};
