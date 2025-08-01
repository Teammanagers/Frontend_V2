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
      password, // TODO 현재 api request 필드에 password 항목 없어서 확인 필요
      postImg,
    }: createTeamMutationProps) => {
      const formData = new FormData();

      const createTeamData = {
        title,
        code: teamCode,
        teamTagList,
        password,
      };

      formData.append('createTeam', JSON.stringify(createTeamData));

      if (postImg) {
        formData.append('imageFile', postImg);
      }

      const makeTeamResponse = await apiRequest({
        url: '/team',
        method: 'POST',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return makeTeamResponse;
    },
    onError: () => {},
    onSuccess: () => {},
  });
  return { createTeamMutation };
};
