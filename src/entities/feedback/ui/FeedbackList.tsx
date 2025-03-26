import { CommentItem } from '@/entities/feedback/ui/CommentItem';

interface FeedbackListProps {
  comments: string[];
}

export function FeedbackList({ comments }: FeedbackListProps) {
  return (
    <>
      {comments.map((commentText, index) => (
        <CommentItem
          key={index}
          author="김지나"
          role="기획자"
          content={commentText}
        />
      ))}
    </>
  );
}
