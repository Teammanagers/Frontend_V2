import styled from 'styled-components';
import MypageHeader from '@/widgets/mypage/MypageHeader.tsx';
import { ProjectList } from '@/widgets/mypage/ui/ProjectList.tsx';

export default function Portfolio() {
  return (
    <Container>
      <MypageHeader showBackButton>포트폴리오</MypageHeader>

      <ContentWrapper>
        <ProjectList />
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 46px 0 0 10%;
`;
