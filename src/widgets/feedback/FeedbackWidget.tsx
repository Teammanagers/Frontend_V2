import styled from 'styled-components';
import FeedbackHeader from '@/entities/feedback/ui/FeedbackHeader';
import FeedbackForm from '@/features/feedback/ui/FeedbackForm';
import FeedbackList from './FeedbackList';

export default function FeedbackWidget() {
  return (
    <Container>
      {/* <EmptyLabel>아직 피드백 남길 자료가 없습니다.</EmptyLabel> */}

      <FeedbackHeader />
      <FeedbackForm />
      <FeedbackList />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 19px;
  width: 100%;
  height: 632px;
  padding: 24px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;

// const EmptyLabel = styled.span`
//   font-size: 14px;
//   font-weight: 500;
//   color: ${({ theme }) => theme.colors.black};
// `;
