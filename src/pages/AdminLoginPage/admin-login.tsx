import styled from 'styled-components';
import AdminLogin from '@/entities/onBoarding/login/ui/AdminLogin';

export function AdminLoginPage() {
  return (
    <Container>
      <ContentsContainer>
        <AdminLogin></AdminLogin>
      </ContentsContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentsContainer = styled.div`
  display: flex;
  width: 1094px;
  height: 578px;
  background-color: white;
  box-shadow:
    7px 2px 16px 0px rgba(0, 0, 0, 0.1),
    28px 9px 30px 0px rgba(0, 0, 0, 0.09),
    65px 20px 41px 0px rgba(0, 0, 0, 0.05),
    117px 36px 48px 0px rgba(0, 0, 0, 0.01),
    182px 57px 53px 0px rgba(0, 0, 0, 0);
  border-radius: 19px;
  border-width: 1px;
`;
