import styled from 'styled-components';
import fileUploadIcon from '@/shared/assets/common/file-upload.svg';
import { FileUploader } from './FileUploader';
import { useFileStateContext } from '../model/useFileStateContext.ts';
import { FileInfo } from '../share.type';

export function EmptyState() {
  const { addFile, setFileList } = useFileStateContext();

  const handleFileUpload = (file: File) => {
    const newFile: FileInfo = {
      fileName: file.name,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      uploadDate: new Date().toISOString().split('T')[0],
      id: Date.now(),
      fileType: file.name.split('.').pop() || '',
      author: '사용자',
      role: '업로더',
    };

    // 파일 업로드 로직
    addFile(file);
    // 파일 목록에 추가하여 FileListView로 전환되도록 함
    setFileList((prevFiles: FileInfo[]) => [...prevFiles, newFile]);
  };

  return (
    <NoticeBox>
      <NoticeText>
        파일을 드래그하거나 아래 버튼을 클릭하여
        <br />
        공유할 수 있습니다.
      </NoticeText>

      <FileUploader
        onFileUpload={handleFileUpload}
        accept=".pptx,.pdf,.doc,.docx,.png,.jpg,.jpeg"
      >
        <UploadBox>
          <IconWrapper>
            <img src={fileUploadIcon} alt="file-upload-icon" />
          </IconWrapper>
          <p>파일 추가하기</p>
        </UploadBox>
      </FileUploader>
    </NoticeBox>
  );
}

const NoticeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 250px;
  height: 100%;
  gap: 16px;
  margin: 0 auto;
`;

const NoticeText = styled.p`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;

const UploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 7px;
  width: 80px;
  height: 68px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;

  p {
    font-size: 10px;
    font-weight: 500;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
