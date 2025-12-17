import { ButtonHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import AddTagIcon from '@/shared/assets/common/add-tag.svg?react';
import Delete from '@/shared/assets/common/delete-tag.svg?react';
import BackButton from '@/shared/assets/memo/back-button.svg?react';
import { Button } from '@/shared/components/button/Button.tsx';
import { useTags } from '@/shared/hooks/useTags';

interface IMemoFormProps {
  authorName: string | undefined;
  initialTitle?: string;
  initialContent?: string;
  initialTags?: { name: string }[];
  onSubmit: (title: string, content: string, tags: { name: string }[]) => void;
  onBack?: () => void;
  submitButtonText: string;
  onDelete?: () => void; // EditMemo에서 사용
  showDeleteButton?: boolean;
}

export const MemoForm = ({
  authorName,
  initialTitle = '',
  initialContent = '',
  initialTags = [],
  onSubmit,
  onBack,
  submitButtonText,
  onDelete,
  showDeleteButton = false,
}: IMemoFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

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
  } = useTags({ initialTags });

  return (
    <MemoContainer>
      <TopContainer>
        <BackBtn onClick={onBack} />
        {/* 제목 입력 */}
        <TitleContainer>
          <TitleInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            placeholder="제목을 입력해주세요"
            autoFocus
          />
        </TitleContainer>
        {/* 태그 */}
        <TagContainer>
          <NameTag>
            <NameTagText>{authorName}</NameTagText>
          </NameTag>
          {tags.map((tag, index) => (
            <Tag
              key={index}
              $isEditing={editTagIndex === index}
              onClick={() => startEditingTag(index)}
            >
              {editTagIndex === index ? (
                <TagInputContainer>
                  <TagInput
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => handleEditTag(e, index)}
                    maxLength={5}
                    autoFocus
                  />
                  <DeleteBtn onClick={() => handleDeleteTag(index)} />
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
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                maxLength={5}
                autoFocus
              />
              <DeleteBtn onClick={() => handleDeleteTag(-1)} />
            </TagInputContainer>
          )}
          {!showTagInput && tags.length < 3 && (
            <AddTagBtn
              onClick={() => {
                setShowTagInput(true);
                setEditTagIndex(null);
              }}
            >
              <AddTagIcon stroke="#5c9eff" />
            </AddTagBtn>
          )}
        </TagContainer>
      </TopContainer>

      {/* 본문 */}
      <BottomContainer>
        <ContentText
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={10000}
          placeholder="내용을 입력해주세요"
        />

        {/* 버튼 */}
        <ButtonContainer>
          {showDeleteButton && onDelete && (
            <Button size="small" style="red" onClick={onDelete}>
              메모 삭제
            </Button>
          )}
          <Button
            size="small"
            style="main"
            onClick={() => onSubmit(title, content, tags)}
          >
            {submitButtonText}
          </Button>
        </ButtonContainer>
      </BottomContainer>
    </MemoContainer>
  );
};

const MemoContainer = styled.div`
  width: 1088px;
  height: 632px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
`;

const TopContainer = styled.div`
  width: 985px;
  height: 146px;
  display: flex;
  flex-direction: column;
  margin-bottom: 19px;
`;

const BackBtn = styled(BackButton)<ButtonHTMLAttributes<HTMLButtonElement>>`
  width: 36px;
  height: 36px;
  display: flex;
  align-self: flex-start;
  margin-bottom: 9px;
  padding: 0;
  cursor: pointer;
  border: none;
  stroke: ${({ theme }) => theme.colors.darkGray};
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 51px;
  display: flex;
  align-items: center;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 27px;
  font-weight: 700;
  font-size: 18px;
  border: none;
  background: none;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 49px;
  border-top: 0.8px solid ${(props) => props.theme.colors.lightGray};
  border-bottom: 0.8px solid ${(props) => props.theme.colors.lightGray};
  display: flex;
  align-items: center;
  gap: 7px;
`;

const NameTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.mainBlue};
`;

const NameTagText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: white;
  padding: 0;
`;

const Tag = styled.div<{ $isEditing?: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 36px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.background};
  color: ${(props) => props.theme.colors.mainBlue};
  cursor: pointer;

  justify-content: ${({ $isEditing }) =>
    $isEditing ? 'flex-start' : 'center'};
  padding: ${({ $isEditing }) => ($isEditing ? '0' : '0 12px')};
`;

const TagText = styled(NameTagText)`
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const TagInput = styled.input`
  width: 91px;
  height: 36px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 5px;
  padding: 0 12px;
  color: ${({ theme }) => theme.colors.mainBlue};
  font-weight: 500;
  font-size: 14px;
`;

export const TagInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const DeleteBtn = styled(Delete)<
  ButtonHTMLAttributes<HTMLButtonElement>
>`
  position: absolute;
  right: 3px;
  width: 23px;
  height: 23px;
`;

const AddTagBtn = styled.div`
  width: 36px;
  height: 36px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 3px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContentText = styled.textarea`
  width: 985px;
  height: 347px;
  border: none;
  font-size: 15px;
  line-height: 23px;
  background: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 19px;
`;
