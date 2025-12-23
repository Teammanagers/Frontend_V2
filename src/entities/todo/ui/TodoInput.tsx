import { ComponentProps } from 'react';
import styled from 'styled-components';
import { Theme } from '@/app/styles/theme';

type TodoInputProps = ComponentProps<'input'>;

export default function TodoInput({ ...props }: TodoInputProps) {
  return <Input {...props} />;
}

const Input = styled.input`
  flex: 1;
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
