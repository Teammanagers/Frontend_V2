import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useCreateTeam } from '../../model/useMakeTeam';

export interface MakeTeamFirstStageProps {
  setStage: Dispatch<SetStateAction<number>>;
}

export const MakeTeamStages = () => {
  // 첫 번째 스테이지 상태
  const [title, setTitle] = useState<string>('');

  // 두 번째 스테이지 상태
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

  const { createTeamMutation } = useCreateTeam();

  const handleClickWorkSpace = (teamTagList: string[]) => {
    createTeamMutation.mutate({
      title,
      teamCode,
      teamTagList: teamTagList,
      password,
    });
  };

  return {
    // 첫 번째 스테이지 상태 및 메서드
    title,
    setTitle,

    // 두 번째 스테이지 상태 및 메서드
    teamCode,
    setTeamCode,
    password,
    setPassword,
    isShowHelperMessage,
    setIsShowHelperMessage,
    isValid,
    handleCopyToClipboard,

    handleClickWorkSpace,
  };
};
