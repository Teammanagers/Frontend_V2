import { ReactElement, useRef } from 'react';
import styled from 'styled-components';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  children: (props: { triggerUpload: () => void }) => ReactElement;
  accept?: string;
}

/**
 * 파일 선택 로직을 제공하는 범용 업로더 컴포넌트입니다.
 * Render Props 패턴을 사용하여 트리거 UI를 주입받습니다.
 *
 * @param {(file: File) => void} onFileSelect - 파일이 선택되었을 때 호출되는 콜백 함수입니다. 선택된 파일은 `File` 객체로 전달됩니다.
 * @param {(props: { triggerUpload: () => void; disabled: boolean }) => ReactElement} children - 숨겨진 파일 입력을 트리거하는 컴포넌트를 반환하는 render prop 함수입니다. `triggerUpload` 함수를 인자로 받습니다.
 * @param {string} [accept=*] - 파일 선택 창에 표시할 파일 유형을 지정합니다. (ex. 'image/*, .pdf')
 */

export default function FileUploader({
  onFileSelect,
  children,
  accept = '*/*',
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 선택 시 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      onFileSelect(selectedFile);
      e.target.value = ''; // 동일 파일 선택 시 onChange 이벤트가 발생하지 않는 문제 방지
    }
  };

  // Presentational 버튼 클릭 시 숨겨진 input 트리거
  const triggerUpload = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  return (
    <>
      <HiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
      />

      {/* input 대신 보여질 Presentational 컴포넌트 */}
      {children({ triggerUpload })}
    </>
  );
}

const HiddenInput = styled.input`
  display: none;
`;
