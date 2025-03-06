import { ReactNode } from 'react';
import styled from 'styled-components';

interface IDropdownMenu {
  children: ReactNode;
  isOpen: boolean;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

/**
 * DropdownMenu 컴포넌트는 드롭다운 메뉴 항목을 위한 컨테이너를 제공합니다.
 * 추가로 top, right 등의 속성을 통해 드롭다운 메뉴의 위치를 설정할 수 있습니다.
 * 해당 컴포넌트의 기본 position은 absolute입니다.
 *
 * @param {ReactNode} children - 드롭다운 메뉴의 내용.
 * @param {boolean} isOpen - 드롭다운 메뉴의 열림 상태.
 * @param {number} [top] - 드롭다운 메뉴의 상단 위치.
 * @param {number} [right] - 드롭다운 메뉴의 오른쪽 위치.
 * @param {number} [bottom] - 드롭다운 메뉴의 하단 위치.
 * @param {number} [left] - 드롭다운 메뉴의 왼쪽 위치.
 */

const DropdownMenu = ({
  children,
  isOpen,
  top = '0',
  right,
  bottom,
  left,
}: IDropdownMenu) => {
  if (!isOpen) return null;
  return (
    <Container
      $isOpen={isOpen}
      $top={top}
      $right={right}
      $bottom={bottom}
      $left={left}
    >
      {children}
    </Container>
  );
};

export default DropdownMenu;

const Container = styled.div<{
  $isOpen: boolean;
  $top?: string;
  $right?: string;
  $bottom?: string;
  $left?: string;
}>`
  position: absolute;
  ${({ $top }) => $top !== undefined && `top: ${$top};`}
  ${({ $right }) => $right !== undefined && `right: ${$right};`}
  ${({ $bottom }) => $bottom !== undefined && `bottom: ${$bottom};`}
  ${({ $left }) => $left !== undefined && `left: ${$left};`}
  background-color: white;
  transform: translateY(0);
  z-index: 999;

  @keyframes dropdown {
    0% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0);
    }
  }
  animation: dropdown 0.3s ease;
`;
