import styled from 'styled-components';
import FormSubmitButton from '@/shared/components/button/FormSubmitButton';
import { FeedbackDept } from '../feedback.types';
import { DEPT_PADDING_MULTIPLIER } from '../feedback.constants';

export default function FeedbackForm({ dept = 0 }: { dept?: FeedbackDept }) {
  return (
    <FormContainer $dept={dept}>
      <Textarea placeholder="피드백 내용을 입력해 주세요." maxLength={300} />
      <FormSubmitButton />
    </FormContainer>
  );
}

const FormContainer = styled.form<{ $dept: 0 | 1 | 2 }>`
  display: flex;
  align-items: center;
  gap: 18px;
  width: 100%;
  padding-left: ${({ $dept }) => DEPT_PADDING_MULTIPLIER * $dept}px;
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
