import { useState } from 'react';
import styled from 'styled-components';
import FormSubmitButton from '@/shared/components/button/FormSubmitButton';
import Modal from '@/shared/components/modal/Modal';

export default function InquiryModal({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toggle();
    setInputValue('');
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalWrapper>
        <TitleWrapper>
          <strong>이용 경험을 남겨주세요.</strong>

          <p>
            불편한 점, 오류, 좋은 점 등 다양한 의견을 남겨주시면 서비스 발전에
            큰 도움이 됩니다.
          </p>
        </TitleWrapper>

        <FormWrapper onSubmit={handleSubmit}>
          <Textarea
            value={inputValue}
            placeholder="이용 경험을 남겨주세요."
            onChange={(e) => setInputValue(e.target.value)}
          />
          <FormSubmitButton type="submit" />
        </FormWrapper>
      </ModalWrapper>
    </Modal>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 534px;
  height: 179px;
  padding: 24px 18px;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.black};
  }

  p {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const FormWrapper = styled.form`
  display: flex;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 5px;
  padding: 9px 12px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 36px;
  background-color: ${({ theme }) => theme.colors.white};
`;
