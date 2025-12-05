import { useEffect, useRef, useState } from 'react';
import { Feedback } from '@/entities/feedback/feedback.types';
import FeedbackHeader from '@/entities/feedback/ui/FeedbackHeader';
import FeedbackList from '@/entities/feedback/ui/FeedbackList';
import { Resource } from '@/entities/resource/resource.types';
import FeedbackForm from '@/features/feedback/ui/FeedbackForm';
import { useScrollToTarget } from '@/shared/hooks/action/useScrollToTarget';

interface FeedbackContentProps {
  selectedResource: Resource;
  feedbacks: Feedback[];
}

export default function FeedbackContent({
  selectedResource,
  feedbacks,
}: FeedbackContentProps) {
  const [replyTarget, setReplyTarget] = useState<Feedback | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { bottomRef, scrollToElement, scrollToBottom } = useScrollToTarget({
    dependency: feedbacks,
    elementIdPrefix: 'feedback-',
  });

  const handleReply = (target: Feedback | null) => {
    setReplyTarget(target);
    if (textareaRef.current) textareaRef.current.focus();
  };

  useEffect(() => {
    setReplyTarget(null);
  }, [selectedResource]);

  return (
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
  );
}
