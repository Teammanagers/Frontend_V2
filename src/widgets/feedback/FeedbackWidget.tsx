import styled from 'styled-components';
import FeedbackHeader from '@/entities/feedback/ui/FeedbackHeader';
import FeedbackForm from '@/features/feedback/ui/FeedbackForm';
import FeedbackList from './FeedbackList';
import { Resource } from '@/entities/resource/resource.types';
import AddFeedbackButton from '@/features/feedback/ui/AddFeedbackButton';

export default function FeedbackWidget({
  selectedResource,
}: {
  selectedResource: Resource | null;
}) {
  return (
    <Container>
      {selectedResource ? (
        <>
          <FeedbackHeader selectedResource={selectedResource} />
          <FeedbackForm />
          <FeedbackList />
        </>
      ) : (
        <EmptyResourceWrapper>
          <EmptyLabel>아직 피드백 남길 자료가 없습니다.</EmptyLabel>

          <AddFeedbackButton />
        </EmptyResourceWrapper>
      )}
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

const EmptyResourceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 19px;
  width: 100%;
  height: 100%;
`;

const EmptyLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;
