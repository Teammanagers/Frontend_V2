import { useState } from 'react';

export function useFeedback() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim() === '') return;
    setComments([...comments, comment]);
    setComment('');
  };

  return {
    comment,
    comments,
    handleInputChange,
    handleSubmit,
  };
}
