import styled from 'styled-components';
import FeedbackItem from '@/features/feedback/ui/FeedbackItem';
import { Feedback } from '../feedback.types';

export default function FeedbackList({ feedbacks }: { feedbacks: Feedback[] }) {
  return (
    <Container $hasFeedbacks={feedbacks.length > 0}>
      {feedbacks.map((feedback) => (
        <FeedbackItem
          key={`feedback-${feedback.id}`}
          feedback={feedback}
          dept={0}
        />
      ))}
    </Container>
  );
}

const Container = styled.ul<{ $hasFeedbacks: boolean }>`
  width: 100%;
  padding: 12px 18px;
  border-bottom: 1px solid
    ${({ $hasFeedbacks, theme }) =>
      $hasFeedbacks ? theme.colors.lightGray : 'none'};
`;
