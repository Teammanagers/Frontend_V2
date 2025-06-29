import { Link } from 'react-router-dom';
import styled from 'styled-components';
import google from '@/shared/assets/common/google-logo.svg?url';
import kakao from '@/shared/assets/common/kakao-logo.svg?url';
import logo from '@/shared/assets/common/logo.svg?url';
import naver from '@/shared/assets/common/naver-logo.svg?url';
import useSocialLogin from '@/features/onBoarding/hooks/useSocialLogin';

export default function LoginOptions() {
  const { socialLoginProvider } = useSocialLogin();
  return (
    <Container>
      <AdminLogin>
        <Link to="/login-admin">관리자 로그인</Link>
      </AdminLogin>
      <LogoContainer>
        <ImgContainer>
          <LogoImg src={logo} />
        </ImgContainer>
        <TextContainer>
          <TextSpanBold>팀매니저에 오신 것을 환영해요!</TextSpanBold>
          <TextSpan>누구나 손쉬운 팀 관리, 함께 해볼까요?</TextSpan>
        </TextContainer>
      </LogoContainer>
      <Options>
        <LoginBtn>
          <KakaoWrapper onClick={() => socialLoginProvider('kakao')}>
            <OauthLogo src={kakao} />
            <LoginSpan>카카오로 1초만에 시작하기</LoginSpan>
          </KakaoWrapper>
        </LoginBtn>
        <LoginBtn>
          <NaverWrapper onClick={() => socialLoginProvider('google')}>
            <OauthLogo src={naver} />
            <LoginSpan>네이버로 1초만에 시작하기</LoginSpan>
          </NaverWrapper>
        </LoginBtn>
        <LoginBtn>
          <GoogleWrapper onClick={() => socialLoginProvider('google')}>
            <OauthLogo src={google} />
            <LoginSpan>구글로 1초만에 시작하기</LoginSpan>
          </GoogleWrapper>
        </LoginBtn>
      </Options>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 547px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;
`;

const AdminLogin = styled.span`
  color: rgba(90, 90, 90, 1);
  font-weight: 500;
  position: absolute;
  top: 32px;
  right: 56px;
  font-size: 12px;
  line-height: 150%;
  cursor: pointer;
`;

const LogoContainer = styled.div`
  height: 176px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;
  align-items: center;
`;

const ImgContainer = styled.div`
  height: 90px;
  width: 90px;
  display: flex;
  justify-content: center;
`;
const LogoImg = styled.img``;

const TextContainer = styled.div`
  display: flex;
  height: 66px;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const TextSpanBold = styled.span`
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
`;

const TextSpan = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LoginBtn = styled.button`
  width: 365px;
  height: 52px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
`;

const LoginSpan = styled.span`
  width: 180px;
  font-weight: 700;
  font-size: 16px;
`;

const OauthLogo = styled.img`
  width: 24px;
  height: 24px;
`;

const BaseWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 19px;
  line-height: 150%;
`;

const KakaoWrapper = styled(BaseWrapper)`
  background-color: rgba(254, 229, 0, 1);
`;

const NaverWrapper = styled(BaseWrapper)`
  background-color: rgba(3, 199, 90, 1);
  color: white;
`;

const GoogleWrapper = styled(BaseWrapper)`
  background-color: white;
  border: 1px solid;
  border-color: rgba(90, 90, 90, 1);
  border-radius: 8px;
`;
