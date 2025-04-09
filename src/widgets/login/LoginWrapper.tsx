import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LeftBar from '@/entities/onBoarding/LeftBar';
import LoginOptions from '@/entities/onBoarding/login/ui/LoginOptions';
import SignUpStage from '@/entities/onBoarding/sign-up/ui/SignUpStage';

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
