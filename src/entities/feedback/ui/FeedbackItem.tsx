import styled from 'styled-components';
import { Feedback, FeedbackDepth } from '@/entities/feedback/feedback.types';
import {
  DEPT_PADDING_MULTIPLIER,
  MAX_RENDER_DEPTH,
} from '@/features/feedback/feedback.constants';
import Avatar from '@/shared/components/avatar/Avatar';

interface IFeedbackProps {
  feedback: Feedback;
  depth: FeedbackDepth;
  onReply: (target: Feedback) => void;
}

export default function FeedbackItem({
  feedback,
  depth = 0,
  onReply,
}: IFeedbackProps) {
  const { children } = feedback;
  const hasChildren = children && children.length > 0;
  const shouldRenderChildren = hasChildren && depth < MAX_RENDER_DEPTH;

  return (
    <>
      <Container $depth={depth}>
        <UserInfo>
          {/* TODO: 프로필 이미지 url 추가 (서버 API Response 수정 요청 필요) */}
          <Avatar imgUrl={''} size={20} />
          <div>
            <strong>{feedback.author.name}</strong>
            <span>{feedback.author.belong ? feedback.author.belong : ''}</span>
            <span>•</span>
            <span>{feedback.updatedAt}</span>
          </div>
        </UserInfo>

        <Content>{feedback.content}</Content>

        {depth !== 2 && (
          <ReplyButton onClick={() => onReply(feedback)}>답글달기</ReplyButton>
        )}
      </Container>

      {shouldRenderChildren && (
        <ChildrenWrapper>
          {children.map((child) => (
            <FeedbackItem
              key={child.id}
              feedback={child}
              depth={(depth + 1) as FeedbackDepth}
              onReply={onReply}
            />
          ))}
        </ChildrenWrapper>
      )}
    </>
  );
}

const Container = styled.li<{ $depth: FeedbackDepth }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  height: fit-content;
  padding: 0 ${({ $depth }) => DEPT_PADDING_MULTIPLIER * $depth}px;
  list-style: none;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 400;

  & > div {
    display: flex;
    gap: 4px;
  }

  strong {
    color: ${({ theme }) => theme.colors.black};
  }

  span {
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const Content = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;

const ReplyButton = styled.button`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const ChildrenWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
