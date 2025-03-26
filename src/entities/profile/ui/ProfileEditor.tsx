import React from 'react';
import styled from 'styled-components';
import { useProfileImage } from '../model/useProfileImage';
import { IProfileEditorProps } from '../profile.type';

export const ProfileEditor: React.FC<IProfileEditorProps> = ({
  onImageChange,
}) => {
  const { imageUrl, handleImageUpload } = useProfileImage(onImageChange);

  return (
    <ProfileEditorContainer>
      <StyledImageContainer htmlFor="image-upload">
        <StyledImage src={imageUrl} alt="프로필 이미지" />
      </StyledImageContainer>
      <FileInput
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </ProfileEditorContainer>
  );
};

const ProfileEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImageContainer = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FileInput = styled.input`
  display: none;
`;
