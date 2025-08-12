import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface IRoleTagProps {
  variants?: 'filled' | 'ghost';
}

/**
 * 역할 태그 공통 컴포넌트입니다.
 *
 * @param {'filled' | 'ghost'} [props.variants='filled'] - 태그 스타일을 결정하는 옵션입니다.
 *   - `filled`: 블루 배경 태그
 *   - `ghost`: 흰 배경 태그
 * @param {React.ReactNode} props.children - 태그 내부에 표시될 내용입니다.
 *
 * @example
 * <Tag variants="filled">기획자</Tag>
 * <Tag variants="ghost">프론트엔드</Tag>
 */

export default function RoleTag({
  variants = 'filled',
  children,
}: PropsWithChildren<IRoleTagProps>) {
  return <Container $variants={variants}>{children}</Container>;
}

const Container = styled.span<{
  $variants: 'filled' | 'ghost';
}>`
  padding: 5px 8px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.mainBlue};
  background-color: ${({ theme, $variants }) =>
    $variants === 'filled' ? theme.colors.background : theme.colors.white};
`;
