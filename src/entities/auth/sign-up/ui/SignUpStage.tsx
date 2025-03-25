import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import Check from '@/shared/assets/common/check.svg';
import logo from '@/shared/assets/common/logo.svg?url';
import { Button } from '@/shared/components/button/Button';

export default function SignUpStage() {
  const [serviceAgree, setServiceAgree] = useState<boolean>(false);
  const [informationAgree, setInformationAgree] = useState<boolean>(false);

  const handleCheckBoxClick = (
    setState: Dispatch<SetStateAction<boolean>>,
  ): void => {
    setState((prev: boolean) => !prev);
  };

  return (
    <SignUpContainer>
      <TitleContainer>
        <TitleImg src={logo} width={90} height={90} />
        <TitleSpan>팀매니저를 이용하려면 약관에 동의가 필요해요.</TitleSpan>
      </TitleContainer>
      <FormWrapper>
        <CheckboxSection
          checked={serviceAgree}
          onCheckboxClick={() => handleCheckBoxClick(setServiceAgree)}
          linkUrl="https://teammanagers.notion.site/7e7dceb62a6a438eb323a285f446a1c7?pvs=4"
          label1="필수"
          label2="이용약관 동의하기"
        />
        <HrStyle />
        <CheckboxSection
          checked={informationAgree}
          onCheckboxClick={() => handleCheckBoxClick(setInformationAgree)}
          linkUrl="https://teammanagers.notion.site/b1b95614dbf745fc9add464a20025c44?pvs=4"
          label1="필수"
          label2="개인정보처리방침 동의하기"
        />
      </FormWrapper>
      <Button size="large" style="main">
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

const TitleSpan = styled.span``;

const HrStyle = styled.hr`
  border-width: 1px 0 0 0;
`;
const FormWrapper = styled.div`
  display: grid;
  place-items: center;
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
  height: 27px;
  display: flex;
  align-items: center;
  margin-top: 25px;
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

const CheckMark = styled(Check)`
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
