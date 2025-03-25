import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LeftBar from '@/entities/auth/LeftBar';
import LoginOptions from '@/entities/auth/login/ui/LoginOptions';
import SignUpStage from '@/entities/auth/sign-up/ui/SignUpStage';

export default function LoginWrapper() {
  const url = useLocation().pathname;
  return (
    <LoginWrapperContainer>
      <LeftBar />
      {url === '/login' ? <LoginOptions /> : <SignUpStage />}
    </LoginWrapperContainer>
  );
}

const LoginWrapperContainer = styled.div`
  display: flex;
`;
