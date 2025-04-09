// lib/auth/UseSignUp.ts
import { Dispatch, SetStateAction, useState } from 'react';

interface CheckboxSectionProps {
  checked: boolean;
  onCheckboxClick: () => void;
  linkUrl: string;
  label1: string;
  label2: string;
}

export const useSignUp = (setStage?: Dispatch<SetStateAction<number>>) => {
  // 약관 동의 상태
  const [serviceAgree, setServiceAgree] = useState<boolean>(false);
  const [informationAgree, setInformationAgree] = useState<boolean>(false);

  // 체크박스 토글 핸들러
  const handleCheckBoxClick = (
    setState: Dispatch<SetStateAction<boolean>>,
  ): void => {
    setState((prev: boolean) => !prev);
  };

  // 다음 단계로 이동하는 핸들러
  const handleContinue = () => {
    if (setStage && serviceAgree && informationAgree) {
      setStage(2);
    }
  };

  // 버튼 활성화 여부
  const isNextButtonEnabled = serviceAgree && informationAgree;

  // 약관 섹션 데이터
  const agreementSections: CheckboxSectionProps[] = [
    {
      checked: serviceAgree,
      onCheckboxClick: () => handleCheckBoxClick(setServiceAgree),
      linkUrl:
        'https://teammanagers.notion.site/7e7dceb62a6a438eb323a285f446a1c7?pvs=4',
      label1: '필수',
      label2: '이용약관 동의하기',
    },
    {
      checked: informationAgree,
      onCheckboxClick: () => handleCheckBoxClick(setInformationAgree),
      linkUrl:
        'https://teammanagers.notion.site/b1b95614dbf745fc9add464a20025c44?pvs=4',
      label1: '필수',
      label2: '개인정보처리방침 동의하기',
    },
  ];

  return {
    serviceAgree,
    setServiceAgree,
    informationAgree,
    setInformationAgree,
    handleCheckBoxClick,
    handleContinue,
    isNextButtonEnabled,
    agreementSections,
  };
};
