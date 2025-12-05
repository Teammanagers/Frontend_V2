import styled from 'styled-components';
import { useGetFeedbackList } from '@/entities/feedback/model/useFeedbackQueries';
import { Resource } from '@/entities/resource/resource.types';
import AddFeedbackButton from '@/features/feedback/ui/AddFeedbackButton';
import FeedbackContent from './FeedbackContent';

export default function FeedbackWidget({
  selectedResource,
  hasResource,
}: {
  selectedResource: Resource | null;
  hasResource: boolean;
}) {
  // TODO: 스켈레톤 100% 작업 후 isPending, isError 처리
  const { data: feedbacks, isSuccess } = useGetFeedbackList(
    selectedResource?.dataId,
  );

  return (
    <Container>
      {selectedResource && isSuccess && (
        <FeedbackContent
          selectedResource={selectedResource}
          feedbacks={feedbacks}
        />
      )}

      {!selectedResource && (
        <EmptyResourceWrapper>
          {!hasResource && (
            <GuideLabel>아직 피드백 남길 자료가 없습니다.</GuideLabel>
          )}

          {hasResource && (
            <>
              <GuideLabel>자료에 대한 피드백을 남길 수 있습니다.</GuideLabel>
              <AddFeedbackButton disabled={true} />
            </>
          )}
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
  overflow-y: auto;
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

const GuideLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;
