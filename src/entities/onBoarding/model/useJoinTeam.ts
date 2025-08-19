import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '@/shared/api/apiRequest';

interface TeamTag {
  id: number;
  name: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  useYn: string;
}

interface Team {
  id: number;
  title: string;
  password: string;
  code: string;
  rootFolderId: number;
  timeSlotId: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  useYn: string;
}

interface TeamSearchResult {
  team: Team;
  imgUrl: string;
  teamTagList: TeamTag[];
}

interface ErrorResponse {
  message: string;
  code?: string;
  error?: string;
}

export default function useJoinTeam() {
  const [teamJoinPassword, setTeamJoinPassword] = useState<string>('');
  const [showHelperMessage, setShowHelperMessage] = useState<boolean>(false);
  const [helperMessage, setHelperMessage] =
    useState<string>('비밀번호가 일치하지 않습니다.');
  const navigate = useNavigate();

  const useSearchTeamMutation = useMutation<TeamSearchResult, Error, string>({
    mutationFn: async (code: string) => {
      const data = await apiRequest({
        url: `/api/v2/team/by-code?teamCode=${code}`,
        method: 'GET',
      });
      return data.result;
    },
    retry: false,
  });

  const useJoinTeamMutation = useMutation<
    unknown,
    AxiosError<ErrorResponse>,
    { teamId: number; password: string }
  >({
    mutationFn: async ({
      teamId,
      password,
    }: {
      teamId: number;
      password: string;
    }) => {
      const data = await apiRequest({
        url: `/api/v2/team/${teamId}/join`,
        method: 'POST',
        data: { password: password },
      });
      return data;
    },
    onSuccess: (_, variables) => {
      navigate(`/team/${variables.teamId}`);
    },
    onError: (error) => {
      setShowHelperMessage(true);
      setHelperMessage(
        error.response?.data?.message || '비밀번호가 일치하지 않습니다.',
      );
    },
  });

  return {
    helperMessage,
    useSearchTeamMutation,
    useJoinTeamMutation,
    teamJoinPassword,
    setTeamJoinPassword,
    showHelperMessage,
    setShowHelperMessage,
  };
}
