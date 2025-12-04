import styled from 'styled-components';
import FormSubmitButton from '@/shared/components/button/FormSubmitButton';
import { useCreateFeedback } from '../model/useFeedbackQueries';

interface FeedbackFormProps {
  selectedResourceId: number | null;
  replyTargetId: number | null;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export default function FeedbackForm({
  selectedResourceId,
  replyTargetId,
  content,
  setContent,
  textareaRef,
}: FeedbackFormProps) {
  const { mutate: createFeedback } = useCreateFeedback();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedResourceId || content.trim() === '') return;

    createFeedback(
      {
        dataId: selectedResourceId,
        data: { content, parentId: replyTargetId },
      },
      {
        onSuccess: () => {
          setContent('');
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
