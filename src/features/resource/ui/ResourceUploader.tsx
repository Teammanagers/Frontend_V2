import { useRef } from 'react';
import styled from 'styled-components';
import AddResourceButton, { AddResourceButtonSize } from './AddResourceButton';
import { useUploadResource } from '../model/useResourceQueries';

interface ResourceUploaderProps {
  size?: AddResourceButtonSize; // 자료 추가 버튼 크기 옵션
}

// TODO: 추후 공통 컴포넌트로 분리 고려
// -> Slot Pattern으로 컴포넌트 주입하여 리팩토링 고려
export default function ResourceUploader({ size }: ResourceUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadResource, isPending } = useUploadResource();

  // 파일 선택 시 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      uploadResource(selectedFile);
    }
  };

  // Presentational 버튼 클릭 시 숨겨진 input 트리거
  const handleButtonClick = () => fileInputRef.current?.click();

  return (
    <>
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="*/*"
      />

      {/* Presentational 버튼 컴포넌트 */}
      <AddResourceButton
        size={size}
        onClick={handleButtonClick}
        disabled={isPending}
      />
    </>
  );
}

const Input = styled.input`
  display: none;
`;
