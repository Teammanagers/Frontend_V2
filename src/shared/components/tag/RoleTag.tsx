import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@/shared/assets/common/delete.svg?react';

interface IRoleTagProps {
  variants?: 'filled' | 'ghost';
  height?: number;
  onDelete?: () => void;
}

/**
 * 역할을 나타내는 태그 컴포넌트입니다.
 *
 * @param {'filled' | 'ghost'} [variants='filled'] - 태그 스타일을 결정하는 옵션입니다.
 *   - `filled`: 블루 배경 태그
 *   - `ghost`: 흰 배경 태그
 * @param {number} [height=28] - 태그의 높이를 결정합니다. 높이에 따라 폰트 크기와 패딩이 조절됩니다.
 * @param {() => void} [onDelete] - 삭제 버튼 클릭 시 실행될 콜백 함수입니다. **이 prop을 전달하면 태그 오른쪽에 삭제 버튼이 렌더링됩니다.**
 * @param {React.ReactNode} children - 태그 내부에 표시될 내용입니다.
 *
 * @example
 * <RoleTag variants="filled" height={36} onDelete={() => alert('태그 삭제!')}>기획자</RoleTag>
 */

export default function RoleTag({
  variants = 'filled',
  height = 28,
  onDelete,
  children,
}: PropsWithChildren<IRoleTagProps>) {
  return (
    <Container $variants={variants} $height={height}>
      {/* 태그 내용 */}
      {children}

      {/* 태그 삭제 버튼 */}
      {onDelete && (
        <DeleteButton onClick={onDelete}>
          <DeleteIcon
            width={height >= 36 ? 24 : 20}
            height={height >= 36 ? 24 : 20}
            stroke={'#5C9EFF'}
            strokeWidth={1}
          />
        </DeleteButton>
      )}
    </Container>
  );
}

const Container = styled.div<{
  $variants: 'filled' | 'ghost';
  $height: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: ${({ $height }) => `${$height}px`};
  padding: 0 ${({ $height }) => ($height >= 36 ? '12px' : '8px')};
  border-radius: 3px;

  font-size: ${({ $height }) => ($height >= 36 ? '14px' : '12px')};
  color: ${({ theme }) => theme.colors.mainBlue};
  background-color: ${({ theme, $variants }) =>
    $variants === 'filled' ? theme.colors.background : theme.colors.white};
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;
