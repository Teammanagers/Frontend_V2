import { ReactNode } from 'react';
import styled from 'styled-components';

/**
 * AccordionBody 컴포넌트는 아코디언의 내용을 감싸는 컨테이너를 제공합니다.
 *
 * @param {ReactNode} children - 아코디언의 내용.
 * @param {boolean} isOpen - 아코디언이 열려있는지 여부.
 * @param {React.RefObject<HTMLDivElement>} parentRef - 부모 요소의 ref.
 * @param {React.RefObject<HTMLDivElement>} childRef - 자식 요소의 ref.
 */

export const AccordionBody = ({
  children,
  isOpen,
  parentRef,
  childRef,
}: {
  children: ReactNode;
  isOpen: boolean;
  parentRef: React.RefObject<HTMLDivElement>;
  childRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <Container ref={parentRef} $isOpen={isOpen}>
      <BodyWrapper ref={childRef} $isOpen={isOpen}>
        {children}
      </BodyWrapper>
    </Container>
  );
};

const Container = styled.div<{ $isOpen: boolean }>`
  height: 0;
  transition: height 0.5s ease;

  // opacity 애니메이션 -> 슬라이더 애니메이션 사용하려면 주석 처리
  overflow: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};

  // 슬라이더 애니메이션 (대신 dropdown이 가려지는 버그 발생 -> createPortal 사용)
  // overflow: hidden;
`;

const BodyWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: auto;
  background-color: white;

  // opacity 애니메이션 -> 슬라이더 애니메이션 사용하려면 주석 처리
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
`;
