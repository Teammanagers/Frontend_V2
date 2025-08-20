import styled from 'styled-components';
import FormSubmitBtnIcon from '@/shared/assets/common/form-submit-btn.svg?react';

interface IFormSubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function FormSubmitButton({ ...props }: IFormSubmitButtonProps) {
  return (
    <Container {...props}>
      <FormSubmitBtnIcon />
    </Container>
  );
}

const Container = styled.button`
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
