import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Feedback } from '@/entities/feedback/feedback.types';
import { useGetFeedbackList } from '@/entities/feedback/model/useFeedbackQueries';
import FeedbackHeader from '@/entities/feedback/ui/FeedbackHeader';
import FeedbackList from '@/entities/feedback/ui/FeedbackList';
import { Resource } from '@/entities/resource/resource.types';
import AddFeedbackButton from '@/features/feedback/ui/AddFeedbackButton';
import FeedbackForm from '@/features/feedback/ui/FeedbackForm';
import { useScrollToTarget } from '@/shared/hooks/action/useScrollToTarget';

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

  const { bottomRef, scrollToElement, scrollToBottom } = useScrollToTarget({
    dependency: feedbacks,
    elementIdPrefix: 'feedback-',
  });

  const [replyTarget, setReplyTarget] = useState<Feedback | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleReply = (target: Feedback | null) => {
    setReplyTarget(target);
    if (textareaRef.current) textareaRef.current.focus();
  };

  useEffect(() => {
    setReplyTarget(null);
  }, [selectedResource]);

  return (
    <Container>
      {selectedResource && isSuccess && (
        <>
          <FeedbackHeader selectedResource={selectedResource} />
          <FeedbackForm
            selectedResource={selectedResource}
            replyTargetId={replyTarget?.id ?? null}
            textareaRef={textareaRef}
            onScrollToTarget={scrollToElement}
            onScrollToBottom={scrollToBottom}
          />
          <FeedbackList
            feedbacks={feedbacks}
            replyTargetId={replyTarget?.id ?? null}
            onReply={handleReply}
            scrollRef={bottomRef}
          />
        </>
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
