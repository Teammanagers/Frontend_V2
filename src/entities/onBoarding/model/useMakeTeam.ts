import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import apiRequest from '@/shared/api/apiRequest';
import { TeamTag } from '@/shared/types/tag.types';

interface createTeamMutationProps {
  title: string;
  teamCode: string;
  teamTagList: TeamTag[];
  password: string;
  postImg: File | null;
}

export const useTeamImgUpload = () => {
  const [postImg, setPostImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostImg(file);

      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPreviewImg(e.target?.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return { postImg, setPostImg, previewImg, setPreviewImg, handleFileUpload };
};

export const useCreateTeam = () => {
  const createTeamMutation = useMutation({
    mutationFn: async ({
      title,
      teamCode,
      teamTagList,
      password,
      postImg,
    }: createTeamMutationProps) => {
      const makeTeamResponse = await apiRequest({
        url: '/team',
        method: 'POST',
        data: { title, teamCode, teamTagList, password, postImg },
      });
      return makeTeamResponse;
    },
    onError: () => {},
    onSuccess: () => {},
  });
  return { createTeamMutation };
};
