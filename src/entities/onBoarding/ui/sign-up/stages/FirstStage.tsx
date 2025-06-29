import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useSignUp } from '@/entities/onBoarding/lib/signUp/singUp';
import checkIcon from '@/shared/assets/common/check.svg';
import logo from '@/shared/assets/common/logo.svg?url';
import { Button } from '@/shared/components/button/Button';

interface FirstStageProps {
  setStage: Dispatch<SetStateAction<number>>;
}

export default function FirstStage({ setStage }: FirstStageProps) {
  const { agreementSections, isNextButtonEnabled, handleContinue } =
    useSignUp(setStage);

  return (
    <SignUpContainer>
      <TitleContainer>
        <TitleImg src={logo} width={90} height={90} />
        <TitleSpan>팀매니저를 이용하려면 약관에 동의가 필요해요.</TitleSpan>
      </TitleContainer>
      <FormWrapper>
        <CheckboxSection
          checked={agreementSections[0].checked}
          onCheckboxClick={agreementSections[0].onCheckboxClick}
          linkUrl={agreementSections[0].linkUrl}
          label1={agreementSections[0].label1}
          label2={agreementSections[0].label2}
        />
        <HrStyle />
        <CheckboxSection
          checked={agreementSections[1].checked}
          onCheckboxClick={agreementSections[1].onCheckboxClick}
          linkUrl={agreementSections[1].linkUrl}
          label1={agreementSections[1].label1}
          label2={agreementSections[1].label2}
        />
      </FormWrapper>
      <Button
        size="large"
        style="main"
        disabled={!isNextButtonEnabled}
        onClick={handleContinue}
      >
        동의 후 가입하기
      </Button>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 547px;
  gap: 48px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleImg = styled.img``;

const TitleSpan = styled.span`
  font-size: 20px;
  line-height: 140%;
  font-weight: 600;
`;

const HrStyle = styled.hr`
  border: none;
  border-top: 2px solid rgba(240, 240, 240, 1);
  height: 0;
  width: 100%;
`;
const FormWrapper = styled.div`
  display: grid;
  place-items: center;
  gap: 25px;
`;

const CheckboxSection = ({
  checked,
  onCheckboxClick,
  linkUrl,
  label1,
  label2,
}: {
  checked: boolean;
  onCheckboxClick: () => void;
  linkUrl: string;
  label1: string;
  label2: string;
}) => (
  <CheckboxContainer>
    <Checkbox checked={checked} onClick={onCheckboxClick}>
      {checked && <CheckMark />}
    </Checkbox>
    <Label primary>{label1}</Label>
    <Label>{label2}</Label>
    <Link onClick={() => window.open(linkUrl, '_blank')}>전문보기</Link>
    {/* <RightArrow /> */}
  </CheckboxContainer>
);

const CheckboxContainer = styled.div`
  width: 437px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #1d1d1d;
`;

const Checkbox = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 76px;
  background-color: ${({ checked }) => (checked ? '#5C9EFF' : '#ccc')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CheckMark = styled.img.attrs({
  src: checkIcon,
  alt: 'check',
})`
  width: 24px;
  height: 24px;
  position: absolute;
`;

const Label = styled.span<{ primary?: boolean }>`
  margin-left: ${({ primary }) => (primary ? '19px' : '10px')};
  font-size: ${({ primary }) => (primary ? '18px' : '18px')};
  line-height: 27px;
  font-weight: 500;
  color: ${({ primary }) => (primary ? '#ff0000' : '#1d1d1d')};
  border-bottom: ${({ primary }) => (primary ? '1px solid #ff0000' : 'none')};
`;

const Link = styled.span`
  margin-left: auto;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
`;
