import { useState } from 'react';
import defaultProfileIcon from '@/shared/assets/icons/profile/default-profile.svg';
import { createObjectUrl } from '../lib/createObjectUrl';

export const useProfileImage = (onImageChange?: (url: string) => void) => {
  const [imageUrl, setImageUrl] = useState<string>(defaultProfileIcon);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newUrl = createObjectUrl(file);
      setImageUrl(newUrl);
      onImageChange?.(newUrl);
    }
  };

  return { imageUrl, handleImageUpload };
};
