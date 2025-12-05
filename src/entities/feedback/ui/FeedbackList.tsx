import styled from 'styled-components';
import FeedbackItem from '@/entities/feedback/ui/FeedbackItem';
import { Feedback } from '../feedback.types';

interface FeedbackListProps {
  feedbacks: Feedback[];
  replyTargetId: number | null;
  onReply: (target: Feedback | null) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export default function FeedbackList({
  feedbacks,
  replyTargetId,
  onReply,
  scrollRef,
}: FeedbackListProps) {
  if (feedbacks.length === 0) return null;

  return (
    <Container $hasFeedbacks={feedbacks.length > 0}>
      {feedbacks.map((feedback) => (
        <FeedbackItem
          key={`feedback-${feedback.id}`}
          feedback={feedback}
          depth={0}
          replyTargetId={replyTargetId}
          onReply={onReply}
        />
      ))}

      {/* 스크롤 타겟 - 피드백 성공 시 이곳으로 스크롤되는 더미 태그 */}
      <ScrollTarget ref={scrollRef} />
    </Container>
  );
}

const Container = styled.ul<{ $hasFeedbacks: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 12px 18px;
  border-bottom: 1px solid
    ${({ $hasFeedbacks, theme }) =>
      $hasFeedbacks ? theme.colors.lightGray : 'transparent'};
  overflow-y: auto;
`;

const ScrollTarget = styled.div``;
