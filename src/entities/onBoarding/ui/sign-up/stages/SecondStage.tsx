import styled from 'styled-components';
import signUpImg from '@/shared/assets/common/signupImg.svg?url';
import { Button } from '@/shared/components/button/Button';

export default function SecondStage() {
  return (
    <Wrapper>
      <img src={signUpImg} width={364} height={244} />
      <Message>환영합니다!</Message>
      <BtnContainer>
        <BtnText>이제 팀매니저를 사용할 수 있어요!</BtnText>
        <Button size="large" style="main">
          우리 팀 만들러 가기
        </Button>
        <BtnText>이미 다른 팀의 초대를 받았나요?</BtnText>
        <Button size="large" style="sub">
          팀 참가하러 가기
        </Button>
      </BtnContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 547px;
`;

const Message = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 150%;
  color: rgba(29, 29, 29, 1);
`;

const BtnContainer = styled.div`
  margin-top: 18px;
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const BtnText = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: rgba(29, 29, 29, 1);
`;
