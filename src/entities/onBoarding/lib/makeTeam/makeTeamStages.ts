import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface MakeTeamFirstStageProps {
  title: string;
  setTitle: (title: string) => void;
  setStage: Dispatch<SetStateAction<number>>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewImg: string | null;
  postImg: File | null;
  setCreatedTeamId: (createdTeamId: number) => void;
  setCreatedTeamCode: (createdTeamCode: string) => void;
}

export const MakeTeamStages = () => {
  const [password, setPassword] = useState<string>('');
  const [isShowHelperMessage, setIsShowHelperMessage] =
    useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [createdTeamId, setCreatedTeamId] = useState<number | null>(null);

  // 폼 유효성 초기화
  useEffect(() => {
    setIsValid(false);
  }, []);

  useEffect(() => {
    const passwordRegex = /^[a-zA-Z0-9]{1,6}$/;
    const isPasswordValid = passwordRegex.test(password);

    setIsValid(isPasswordValid);
  }, [password]);

  const handleCopyToClipboard = async (teamCode: string | null) => {
    await navigator.clipboard.writeText(teamCode || '');
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
    password,
    setPassword,
    isShowHelperMessage,
    setIsShowHelperMessage,
    isValid,
    handleCopyToClipboard,
    setCreatedTeamId,
    createdTeamId,
  };
};
