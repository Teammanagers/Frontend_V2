import styled from 'styled-components';
import sendFeedbackIcon from '@/shared/assets/icons/share/send-feedback.svg';

interface FeedbackFormProps {
  comment: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

export function FeedbackForm({
  comment,
  onChange,
  onSubmit,
}: FeedbackFormProps) {
  return (
    <ContentBox>
      <InputBox
        placeholder="피드백 내용을 입력해주세요"
        value={comment}
        onChange={onChange}
      />
      <SendBox onClick={onSubmit}>
        <img src={sendFeedbackIcon} alt="send-feedback-icon" />
      </SendBox>
    </ContentBox>
  );
}

const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 486px;
  height: 76px;
  gap: 18px;
`;

const InputBox = styled.textarea`
  width: 420px;
  height: 76px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
`;

const SendBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.mainBlue};
  border-radius: 4px;
  padding: 7px 16px;
  cursor: pointer;
`;
