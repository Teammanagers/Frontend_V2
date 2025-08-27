import styled from 'styled-components';
import mockData from '@/features/feedback/feedback.json';
import Feedback from '@/features/feedback/ui/Feedback';

export default function FeedbackList() {
  return (
    <Container>
      {mockData.map((feedback) => (
        <Feedback feedback={feedback} dept={0} />
      ))}
    </Container>
  );
}

const Container = styled.ul`
  width: 100%;
  padding: 12px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;
