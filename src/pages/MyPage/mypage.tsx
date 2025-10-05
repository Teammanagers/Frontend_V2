import MypageMenu from '@/widgets/mypage/MyPageMenu';
import styled from 'styled-components';

export function MyPage() {
  return (
    <Container>
      <Title>마이 페이지</Title>

      <MypageMenu />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Title = styled.h1`
  padding: 100px 0 0 5%;
  margin-bottom: 94px;
  font-size: 24px;
  font-weight: bold;
`;
