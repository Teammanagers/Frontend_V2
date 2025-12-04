import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { Resource } from '@/entities/resource/resource.types';
import FormSubmitButton from '@/shared/components/button/FormSubmitButton';
import { useCreateFeedback } from '../model/useFeedbackQueries';

interface FeedbackFormProps {
  selectedResource: Resource | null;
  replyTargetId: number | null;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  onScrollToTarget: (id: number) => void;
  onScrollToBottom: () => void;
}

export default function FeedbackForm({
  selectedResource,
  replyTargetId,
  textareaRef,
  onScrollToTarget,
  onScrollToBottom,
}: FeedbackFormProps) {
  const { mutate: createFeedback } = useCreateFeedback();
  const queryClient = useQueryClient();

  const [content, setContent] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedResource?.dataId || content.trim() === '') return;

    createFeedback(
      {
        dataId: selectedResource.dataId,
        data: { content, parentId: replyTargetId },
      },
      {
        onSuccess: async () => {
          setContent('');

          await queryClient.invalidateQueries({
            queryKey: ['feedbacks', selectedResource?.dataId],
          });

          // 답글 대상이 있으면 해당 피드백 위치로, 없으면 맨 아래로 스크롤
          if (replyTargetId) {
            onScrollToTarget(replyTargetId);
          } else {
            onScrollToBottom();
          }
        },
      },
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        placeholder="피드백 내용을 입력해 주세요."
        maxLength={300}
      />
      <FormSubmitButton />
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 18px;
  width: 100%;
`;

const Textarea = styled.textarea`
  min-width: 420px;
  height: 76px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;
