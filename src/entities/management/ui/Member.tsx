import { ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { TagInputContainer } from '@/entities/memo/ui/MemoForm.tsx';
import Delete from '@/shared/assets/common/delete-tag.svg?react';
import Plus from '@/shared/assets/common/plus.svg?react';
import Default from '@/shared/assets/management/profile-img-default.svg?react';
import { useTags } from '@/shared/hooks/useTags.ts';
import { IMemberResponse } from '@/shared/types/member.types.ts';

interface IMemberProps {
  member: IMemberResponse;
  onCreateRoleTag: (tagName: string) => void;
  onEditRoleTag: (tagId: number, tagName: string) => void;
  onDeleteRoleTag: (tagId: number) => void;
}

export const Member = ({
  member,
  onCreateRoleTag,
  onEditRoleTag,
  onDeleteRoleTag,
}: IMemberProps) => {
  const {
    tags,
    showTagInput,
    newTag,
    editTagIndex,
    handleAddTag,
    handleEditTag,
    startEditingTag,
    handleDeleteTag,
    setShowTagInput,
    setEditTagIndex,
    setNewTag,
  } = useTags({
    initialTags: member.grantedRoleList.map((role) => ({
      tagId: role.id,
      name: role.name,
    })),
    onCreateRoleTag,
    onEditRoleTag,
    onDeleteRoleTag,
  });
  const { imgUrl, member: memberInfo } = member;

  return (
    <MemberContainer>
      {imgUrl ? (
        <ProfileImg src={imgUrl} alt="profile" />
      ) : (
        <Default width={40} height={40} />
      )}
      <Name>{memberInfo.name}</Name>
      <TagContainer>
        {tags.map((tag, index) => (
          <TagBox
            key={tag.tagId}
            $isEditing={editTagIndex === index}
            onClick={() => startEditingTag(index)}
          >
            {editTagIndex === index ? (
              <TagInputContainer>
                <TagInput
                  value={newTag}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewTag(e.target.value)
                  }
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                    handleEditTag(e, index)
                  }
                  maxLength={5}
                  autoFocus
                />
                <DeleteBtn
                  onClick={() => {
                    handleDeleteTag(index);
                  }}
                />
              </TagInputContainer>
            ) : (
              <TagText>{tag.name}</TagText>
            )}
          </TagBox>
        ))}

        {showTagInput && editTagIndex === null && (
          <TagInputContainer>
            <TagInput
              value={newTag}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewTag(e.target.value)
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleAddTag(e)
              }
              maxLength={5}
              autoFocus
            />
            <DeleteBtn
              onClick={() => {
                setShowTagInput(false);
                setNewTag('');
                setEditTagIndex(null);
              }}
            />
          </TagInputContainer>
        )}
        {!showTagInput && tags.length < 3 && (
          <AddBtn
            onClick={() => {
              setShowTagInput(true);
              setEditTagIndex(null);
            }}
          >
            <Plus width={20} height={20} stroke="#5C9EFF" strokeWidth={1} />
          </AddBtn>
        )}
      </TagContainer>
    </MemberContainer>
  );
};

const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: 44px;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-right: 4px;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TagBox = styled.div<{ $isEditing?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 8px 5px 8px;
  height: 28px;
  border-radius: 3px;
  background: ${({ $isEditing }) => ($isEditing ? 'transparent' : 'white')};
`;

export const TagText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const TagInput = styled.input`
  width: 80px;
  height: 36px;
  padding: 0 10px;
  border-radius: 5px;
  font-size: 12px;
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  outline: none;
`;

const AddBtn = styled.button`
  display: flex;
  width: 28px;
  height: 28px;
  border-radius: 3px;
  background: white;
  justify-content: center;
  align-items: center;
`;

const DeleteBtn = styled(Delete)`
  position: absolute;
  right: 6px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
