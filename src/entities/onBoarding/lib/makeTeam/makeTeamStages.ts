import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface MakeTeamFirstStageProps {
  title: string;
  setTitle: (title: string) => void;
  setStage: Dispatch<SetStateAction<number>>;
}

export const MakeTeamStages = () => {
  const [teamCode, setTeamCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isShowHelperMessage, setIsShowHelperMessage] =
    useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  // 폼 유효성 초기화
  useEffect(() => {
    setIsValid(false);
  }, []);

  // 폼 유효성 확인
  useEffect(() => {
    // 실제 유효성 검사 로직 (예: 암호 길이, 팀 코드 존재 여부 등)
    const isFormValid = teamCode.length > 0 && password.length > 0;
    setIsValid(isFormValid);
  }, [teamCode, password]);

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(teamCode);
    setIsShowHelperMessage(true);
  };

  // const { createTeamMutation } = useCreateTeam();

  // const handleClickWorkSpace = (teamTagList: string[]) => {
  //   createTeamMutation.mutate({
  //     title,
  //     teamCode,
  //     teamTagList: teamTagList,
  //     password,
  //   });
  // };

  return {
    teamCode,
    setTeamCode,
    password,
    setPassword,
    isShowHelperMessage,
    setIsShowHelperMessage,
    isValid,
    handleCopyToClipboard,
  };
};
