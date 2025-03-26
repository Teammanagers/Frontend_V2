import { useRef } from 'react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  accept?: string;
  children: React.ReactNode;
}

export function FileUploader({
  onFileUpload,
  accept = '*/*',
  children,
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onFileUpload(file);
    event.target.value = '';
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* 버튼 클릭 시 파일 업로드 창 열기 */}
      <div onClick={() => fileInputRef.current?.click()}>{children}</div>
    </>
  );
}
