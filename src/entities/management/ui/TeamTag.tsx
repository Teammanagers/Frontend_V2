import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import { useTeamTags } from '@/entities/management/model/useTeamTags';
import Delete from '@/shared/assets/common/delete-tag.svg?react';
import Plus from '@/shared/assets/common/plus.svg?react';

interface TeamTagManagerProps {
  tagList: { name: string }[];
  onCreateTeamTag: (tagName: string) => void;
  onDeleteTeamTag: (tagId: number) => void;
}

export const TeamTag = ({
  tagList,
  onCreateTeamTag,
  onDeleteTeamTag,
}: TeamTagManagerProps) => {
  const {
    tags,
    newTag,
    editTagIndex,
    handleAddTag,
    handleEditTag,
    startEditingTag,
    handleDeleteTag,
    // setTags,
    setEditTagIndex,
    setNewTag,
  } = useTeamTags({
    initialTags: tagList,
    onCreateTeamTag,
    onDeleteTeamTag,
  });

  console.log('태그리스트:', tagList);
  const [isAddingTag, setIsAddingTag] = useState(false);

  return (
    <TagContainer>
      {tags.map((tag, index) => (
        <TagBox
          key={tag.tagId}
          onClick={() => {
            if (isAddingTag) return;
            startEditingTag(index);
            setIsAddingTag(false);
          }}
        >
          {editTagIndex === index ? (
            <TagInputWrapper>
              <TagInput
                value={newTag}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewTag(e.target.value)
                }
                onKeyDown={(e) => handleEditTag(e, index)}
                autoFocus
              />
              <DeleteBtn onClick={() => handleDeleteTag(index)} />
            </TagInputWrapper>
          ) : (
            <TagText>{tag.name}</TagText>
          )}
        </TagBox>
      ))}
      {isAddingTag ? (
        <TagInputWrapper>
          <TagInput
            value={newTag}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTag(e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleAddTag(e)}
            maxLength={5}
            autoFocus
          />
          <DeleteBtn
            onClick={() => {
              setIsAddingTag(false);
              setNewTag('');
              setEditTagIndex(null);
            }}
          />
        </TagInputWrapper>
      ) : (
        <AddBtn
          onClick={() => {
            setIsAddingTag(true);
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

const TagInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const DeleteBtn = styled(Delete)`
  position: absolute;
  right: 6px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
