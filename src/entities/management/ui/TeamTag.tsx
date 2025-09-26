import { ChangeEvent, KeyboardEvent, useRef } from 'react';
import styled from 'styled-components';
import { useTeamTags } from '@/entities/management/model/useTeamTags';
import Plus from '@/shared/assets/common/plus.svg?react';
import useClickOutside from '@/shared/hooks/action/useClickOutside';

interface TeamTagManagerProps {
  tagList: { name: string }[];
  onCreateTeamTag: (tagName: string) => void;
}

export const TeamTag = ({ tagList, onCreateTeamTag }: TeamTagManagerProps) => {
  const tagInputRef = useRef<HTMLDivElement>(null);

  const {
    tags,
    showTagInput,
    newTag,
    handleAddTag,
    // setTags,
    setShowTagInput,
    setEditTagIndex,
    setNewTag,
  } = useTeamTags({
    initialTags: tagList,
    onCreateTeamTag,
  });

  useClickOutside(tagInputRef, () => {
    if (showTagInput) {
      setShowTagInput(false);
      setNewTag('');
      setEditTagIndex(null);
    }
  });

  return (
    <TagContainer ref={tagInputRef}>
      {tags.map((tag, index) => (
        <TagBox key={index}>
          <TagText>{tag.name}</TagText>
        </TagBox>
      ))}
      {showTagInput ? (
        <TagInput
          value={newTag}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewTag(e.target.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleAddTag(e)}
          autoFocus
        />
      ) : (
        <AddBtn
          onClick={() => {
            setShowTagInput(true);
            setEditTagIndex(null);
          }}
        >
          <Plus stroke="#5C9EFF" strokeWidth={2} />
        </AddBtn>
      )}
    </TagContainer>
  );
};

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 52px;
`;

const TagBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  border-radius: 5px;
  background: white;
`;

const TagText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const AddBtn = styled.button`
  display: flex;
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background: white;
  justify-content: center;
  align-items: center;
`;

const TagInput = styled.input`
  width: 100px;
  height: 36px;
  padding: 0 12px;
  border-radius: 5px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  outline: none;
`;
