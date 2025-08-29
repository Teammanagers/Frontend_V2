import styled from 'styled-components';
import FormSubmitButton from '@/shared/components/button/FormSubmitButton';

export default function FeedbackForm() {
  return (
    <FormContainer>
      <Textarea placeholder="피드백 내용을 입력해 주세요." maxLength={300} />
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
