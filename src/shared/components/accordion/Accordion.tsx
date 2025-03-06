import styled from 'styled-components';
import { AccordionProps } from './types.ts';
import { AccordionHeader } from './Header.tsx';
import { AccordionBody } from './Body.tsx';
import { forwardRef } from 'react';
import { useAccordionToggle } from './hooks/useAccordionToggle.ts';

/**
 * Accordion 컴포넌트는 아코디언의 구성요소(Header, Body)를 감싸는 Container 컴포넌트입니다.
 *
 * @param {ReactNode} children - 아코디언 내부에 들어갈 내용 (예: 투두 리스트 등).
 * @param {string} title - 아코디언의 제목 (예: 팀원 이름).
 * @param {string[]} tagList - 제목 옆에 표시될 태그 목록 (예: 기획자).
 */

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, title, tagList }) => {
    const { isOpen, toggleAccrodion, parentRef, childRef } =
      useAccordionToggle();

    return (
      <AccordionContainer>
        <AccordionHeader
          isOpen={isOpen}
          onClick={toggleAccrodion}
          title={title}
          tagList={tagList}
        />
        <AccordionBody
          isOpen={isOpen}
          parentRef={parentRef}
          childRef={childRef}
        >
          {children}
        </AccordionBody>
      </AccordionContainer>
    );
  },
);

Accordion.displayName = 'Accordion';

export { Accordion };

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 382px;
  background-color: #ffffff;
`;
