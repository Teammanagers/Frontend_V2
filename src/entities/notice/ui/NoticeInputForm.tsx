import styled from 'styled-components';
import NoticeSubmitBtn from '@/shared/assets/main/notice-submit-btn.svg?react';
import { useState } from 'react';
import useBulletPointConverter from '@/shared/hooks/action/useBulletPointConverter';
import useNoticeQueries from '../model/useNoticeQueries';

function NoticeInputForm({ toggle }: { toggle: () => void }) {
  const [inputValue, setInputValue] = useState<string>('');

  // 공지 생성 API 호출
  const { useCreateNoticeMutation } = useNoticeQueries();
  const createNoticeMutation = useCreateNoticeMutation();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createNoticeMutation.mutate({ content: inputValue }); // 공지 생성 API 호출
    setInputValue('');
    toggle();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Textarea
        value={inputValue}
        placeholder="공지 내용을 입력해주세요"
        name="notice"
        maxLength={50}
        onChange={handleChange}
        onKeyDown={(e) => useBulletPointConverter({ e, setInputValue })}
      />
      <Button type="submit">
        <NoticeSubmitBtn />
      </Button>
    </FormContainer>
  );
}

export { NoticeInputForm };

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 498px;
  height: 54px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 420px;
  height: 36px;
  resize: none;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.mainBlue};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: #3c8bff;
    transition: background-color 0.3s;
    box-shadow: 0 1px 4px 0 rgba(60, 139, 255, 0.06);
  }
`;
