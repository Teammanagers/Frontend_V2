import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import apiRequest from '@/shared/api/apiRequest';
import { TeamTag } from '@/shared/types/tag.types';

interface createTeamMutationProps {
  title: string;
  teamTagList: TeamTag[];
  postImg: File | null;
}

interface createTeamPasswordMutationProps {
  teamId: number | null;
  password: string;
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

export const useCreateTeam = (onSuccess?: (data: unknown) => void) => {
  const createTeamMutation = useMutation({
    mutationFn: async ({
      title,
      teamTagList,
      postImg,
    }: createTeamMutationProps) => {
      const formData = new FormData();

      const createTeamData = {
        title,
        teamTagList: teamTagList.map((tag) => tag.name),
      };

      formData.append('createTeam', JSON.stringify(createTeamData));

      if (postImg) {
        formData.append('imageFile', postImg);
      }

      const makeTeamResponse = await apiRequest({
        url: '/api/v2/team',
        method: 'POST',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return makeTeamResponse;
    },
    onError: () => {},
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });

  const createTeamPasswordMutation = useMutation({
    mutationFn: async ({
      teamId,
      password,
    }: createTeamPasswordMutationProps) => {
      await apiRequest({
        url: `/api/v2/team/${teamId}/password`,
        method: 'PATCH',
        data: {
          password,
        },
      });
    },
  });
  return { createTeamMutation, createTeamPasswordMutation };
};
