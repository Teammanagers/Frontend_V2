import { Theme } from '@/app/styles/theme';
import styled from 'styled-components';

interface ITodoInput extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function TodoInput({ ...props }: ITodoInput) {
  return <Input {...props} />;
}

const Input = styled.input`
  width: 302px;
  height: 30px;
  padding-left: 8px;
  border-radius: 4px;
  background-color: ${Theme.colors.lightGray};

  font-size: 12px;
  font-weight: 400;
  color: ${Theme.colors.black};

  &::placeholder {
    color: ${Theme.colors.darkGray};
  }
`;
