import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';
import { MakeTeamStages } from '@/entities/onBoarding/lib/make-team/makeTeamStages';
import arrow from '@/shared/assets/common/expand-right-arrow.svg?url';
import { Button } from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';

export default function MakeTeamSecondStage() {
  const {
    isShowHelperMessage,
    setTeamCode,
    teamCode,
    setIsShowHelperMessage,
    isValid,
  } = MakeTeamStages();
  return (
    <StageContainer>
      <BackContainer>
        <img src={arrow} width={40} height={40} />
        <BackSpan>프로젝트를 위해 팀을 생성해주세요</BackSpan>
      </BackContainer>
      <InputContainer>
        <TeamCodeRow>
          <InputWrapper>
            <Input
              title="Team Code"
              showHelperMessage={isShowHelperMessage}
              helperMessage="코드가 복사되었습니다."
              textColor="rgba(92, 158, 255, 1)"
              onChange={(e) => {
                setTeamCode(e.target.value);
              }}
            />
          </InputWrapper>
          <ButtonWrapper>
            <CopyToClipboard text={teamCode}>
              <Button
                size="mini"
                style="main"
                onClick={() => setIsShowHelperMessage(true)}
              >
                팀 코드 복사
              </Button>
            </CopyToClipboard>
          </ButtonWrapper>
        </TeamCodeRow>

        <PasswordInputContainer>
          <Input
            title="비밀번호"
            placeholder="참가를 위한 비밀번호를 설정해주세요"
          />
        </PasswordInputContainer>
      </InputContainer>
      <BtnContainer>
        <Button size="xxl" style="sub">
          이메일로 보내기
        </Button>
        <Button size="xxl" style="main" disabled={isValid}>
          워크 스페이스로 이동
        </Button>
      </BtnContainer>
    </StageContainer>
  );
}

const StageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 51px;
  background-color: #f8fafc;
`;

const BackContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 112px;
  display: flex;
`;

const BackSpan = styled.span`
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  color: black;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 53px;
  width: 664px;
`;

const TeamCodeRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  width: 100%;
`;

const InputWrapper = styled.div`
  flex: 1;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 4.5px;
`;

const PasswordInputContainer = styled.div`
  width: 100%;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 664px;
`;
