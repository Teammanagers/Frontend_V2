import styled from 'styled-components';
import Avatar from '@/shared/components/avatar/Avatar';
import FileUploader from '@/shared/components/fileUploader/FileUploader';
import { useProfileImageUpload } from '../hooks/useProfileImageUpload';

interface ProfileImageUploaderProps {
  isEditing: boolean;
}

export default function ProfileImageUploader({
  isEditing,
}: ProfileImageUploaderProps) {
  const { displayImgURL, handleImgSelect } = useProfileImageUpload();

  return (
    <FileUploader onFileSelect={handleImgSelect} accept="image/*">
      {({ triggerUpload }) => (
        <ProfileImg
          size={150}
          imgUrl={displayImgURL}
          onClick={() => {
            if (isEditing) triggerUpload();
          }}
          $isEditable={isEditing}
        />
      )}
    </FileUploader>
  );
}

const ProfileImg = styled(Avatar)<{ $isEditable: boolean }>`
  cursor: ${({ $isEditable }) => ($isEditable ? 'pointer' : 'default')};
  transition: all 0.3s ease;

  &:hover {
    opacity: ${({ $isEditable }) => ($isEditable ? 0.8 : 1)};
  }
`;
