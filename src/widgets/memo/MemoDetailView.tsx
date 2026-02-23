import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import Delete from '@/shared/assets/common/delete-tag.svg?react';
import BackButton from '@/shared/assets/memo/back-button.svg?react';
import { Button } from '@/shared/components/button/Button.tsx';

interface IMemoDetailViewProps {
  authorName?: string;
  title: string;
  content: string;
  memoTagList: { name: string }[];
  onBack?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const MemoDetailView = ({
  authorName,
  title,
  content,
  memoTagList,
  onBack,
  onEdit,
  onDelete,
}: IMemoDetailViewProps) => {
  return (
    <MemoContainer>
      <TopContainer>
        <BackBtn onClick={onBack} />
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>

        <TagContainer>
          {authorName && (
            <NameTag>
              <NameTagText>{authorName}</NameTagText>
            </NameTag>
          )}

          {memoTagList.map((tag, index) => (
            <Tag key={index}>
              <TagText>{tag.name}</TagText>
            </Tag>
          ))}
        </TagContainer>
      </TopContainer>

      <BottomContainer>
        <ContentText>{content}</ContentText>

        <ButtonContainer>
          {onDelete && (
            <Button size="small" style="red" onClick={onDelete}>
              메모 삭제
            </Button>
          )}
          {onEdit && (
            <Button size="small" style="main" onClick={onEdit}>
              메모 수정
            </Button>
          )}
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

const Title = styled.div`
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

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContentText = styled.div`
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
