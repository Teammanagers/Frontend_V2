import { ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useTeamTags } from '@/entities/management/model/useTeamTags';
import { TagInputContainer } from '@/entities/memo/ui/MemoForm.tsx';
import Delete from '@/shared/assets/common/delete-tag.svg?react';
import Plus from '@/shared/assets/common/plus.svg?react';

interface TeamTagManagerProps {
  tagList: { name: string }[];
  isTeamLeader: boolean;
  onCreateTeamTag: (tagName: string) => void;
  onDeleteTeamTag: (tagId: number) => void;
  onEditTeamTag: (tagId: number, tagName: string) => void;
}

export const TeamTag = ({
  tagList,
  isTeamLeader,
  onCreateTeamTag,
  onDeleteTeamTag,
  onEditTeamTag,
}: TeamTagManagerProps) => {
  const {
    tags,
    showTagInput,
    newTag,
    editTagIndex,
    handleChangeTag,
    handleAddTag,
    handleEditTag,
    startEditingTag,
    cancelNewTag,
    handleDeleteTag,
    setShowTagInput,
    setEditTagIndex,
  } = useTeamTags({
    initialTags: tagList,
    onCreateTeamTag,
    onDeleteTeamTag,
    onEditTeamTag,
  });

  return (
    <TagContainer $isTeamLeader={isTeamLeader}>
      {tags.map((tag, index) => (
        <Tag
          key={tag.tagId}
          $isEditing={editTagIndex === index}
          onClick={() => {
            if (!isTeamLeader) return;
            startEditingTag(index);
          }}
        >
          {editTagIndex === index ? (
            <TagInputContainer>
              <TagInput
                value={newTag}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeTag(e.target.value)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleEditTag(e, index)
                }
                maxLength={5}
                autoFocus
              />
              <DeleteBtn
                onClick={() => {
                  // tagId가 있으면 외부 삭제 호출
                  if ('tagId' in tag && typeof tag.tagId === 'number') {
                    onDeleteTeamTag(tag.tagId);
                  }
                  handleDeleteTag(index); // 내부 상태 업데이트
                }}
              />
            </TagInputContainer>
          ) : (
            <TagText>{tag.name}</TagText>
          )}
        </Tag>
      ))}

      {showTagInput && editTagIndex === null && (
        <TagInputContainer>
          <TagInput
            value={newTag}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeTag(e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleAddTag(e)}
            maxLength={5}
            autoFocus
          />
          <DeleteBtn onClick={cancelNewTag} />
        </TagInputContainer>
      )}

      {tags.length === 0 && !isTeamLeader && (
        <NoTag>
          <TagText>아직 등록된 태그가 없어요.</TagText>
        </NoTag>
      )}

      {isTeamLeader && !showTagInput && tags.length < 3 && (
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

const TagContainer = styled.div<{ $isTeamLeader: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 52px;
  cursor: ${({ $isTeamLeader }) => ($isTeamLeader ? 'pointer' : 'auto')};
`;

const Tag = styled.div<{ $isEditing: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 5px;
  background: white;
  padding: ${({ $isEditing }) => ($isEditing ? '0' : '8px 12px')};
  justify-content: ${({ $isEditing }) =>
    $isEditing ? 'flex-start' : 'center'};
`;

const TagText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const NoTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 181px;
  height: 36px;
  border-radius: 5px;
  background: white;
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
  width: 91px;
  height: 36px;
  padding: 0 12px;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  background: white;
  color: ${({ theme }) => theme.colors.mainBlue};
  font-weight: 500;
`;

const DeleteBtn = styled(Delete)`
  position: absolute;
  right: 6px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
