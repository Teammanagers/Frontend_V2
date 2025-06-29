import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LeftBar from '@/entities/onBoarding/ui/LeftBar';
import LoginOptions from '@/entities/onBoarding/ui/login/LoginOptions';
import SignUpStage from '@/entities/onBoarding/ui/sign-up/SignUpStage';
import { OnBoard } from '@/shared/components/onBoarding/onBoard';

export default function LoginWrapper() {
  const url = useLocation().pathname;
  return (
    <OnBoard>
      <LoginWrapperContainer>
        <LeftBar />
        {url === '/login' && <LoginOptions />}
        {url === '/sign-up' && <SignUpStage />}
      </LoginWrapperContainer>
    </OnBoard>
  );
}

const LoginWrapperContainer = styled.div`
  display: flex;
`;
