import styled from 'styled-components';

interface MainSectionLayoutProps {
  navLink: React.ReactNode; // 네비게이션 링크 컴포넌트
  content: React.ReactNode; // 섹션의 주요 콘텐츠 컴포넌트
}

/**
 * @description 메인 페이지의 각 섹션(다가오는 일정, 투두리스트 등)에 일관된 레이아웃을 적용하기 위한 래퍼(Wrapper) 컴포넌트입니다.
 * 'Slot' 패턴을 사용하여, 부모 컴포넌트로부터 네비게이션 링크(navLink)와 주요 콘텐츠(content)를 주입받아 렌더링합니다.
 *
 * @param {React.ReactNode} navLink - 섹션의 제목 역할을 하는 네비게이션 링크 엘리먼트입니다. (예: <MainSectionLink to="/path">섹션 제목</MainSectionLink>)
 * @param {React.ReactNode} content - 섹션의 본문 내용을 구성하는 위젯 또는 엘리먼트입니다. (예: <TodoList />)
 */
export default function MainSectionLayout({
  navLink,
  content,
}: MainSectionLayoutProps) {
  return (
    <Container>
      {navLink}
      {content}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
