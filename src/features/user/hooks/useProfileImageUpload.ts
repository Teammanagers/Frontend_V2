import { useFormContext, useWatch } from 'react-hook-form';
import { ProfileFormValues } from '../model/profile.schema';
import { useEffect, useState } from 'react';

// 이미지 업로드 및 미리보기 관련 로직 커스텀 훅
export const useProfileImageUpload = () => {
  const { setValue, control } = useFormContext<ProfileFormValues>();
  const currImg = useWatch({ control, name: 'imgURL' });

  // 새로 업로드한 이미지 미리보기용 url (폼의 실제 데이터와는 별개)
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  // 이미지 선택 시 실행되는 이벤트 핸들러
  const handleImgSelect = (file: File) => {
    setValue('imgURL', file, { shouldValidate: true });

    if (previewImg) URL.revokeObjectURL(previewImg); // 이전 미리보기 URL 메모리에서 제거

    // 선택된 파일로부터 미리보기 이미지에 대한 임시 URL 생성하여 화면에 반영
    const previewURL = URL.createObjectURL(file);
    setPreviewImg(previewURL);

    // TODO: 파일 업로드 API 호출 로직 추가
  };

  /* 최종적으로 Avatar 컴포넌트에 전달할 이미지 URL
   * - 새로 선택한 이미지가 있으면 previewImg 사용
   * - 없으면 폼에 저장된 기존 (서버에서 받은) currImg URL 사용
   */
  const displayImgURL =
    previewImg || (typeof currImg === 'string' ? currImg : null);

  // 컴포넌트 언마운트 시점에 미리보기 URL 메모리에서 제거
  useEffect(() => {
    return () => {
      if (previewImg) URL.revokeObjectURL(previewImg);
    };
  }, [previewImg]);

  return {
    displayImgURL,
    handleImgSelect,
  };
};
