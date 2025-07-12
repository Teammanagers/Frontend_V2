import styled from 'styled-components';
import fileUploadIcon from '@/shared/assets/common/file-upload.svg';
import { FileItem } from './FileItem';
import { FileInfo } from '../share.type';
import { FileUploader } from './FileUploader';
import { useFileStateContext } from '../model/useFileStateContext';

export function FileListView() {
  const { addFile, fileList, setFileList } = useFileStateContext();

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

    addFile(file);
    setFileList((prevFiles: FileInfo[]) => [...prevFiles, newFile]);
  };

  return (
    <>
      <FileListBox>
        {fileList.map((file) => (
          <FileItem key={file.id} fileInfo={file} />
        ))}

        {/* 파일 업로드 버튼 */}
        <FileUploader
          onFileUpload={handleFileUpload}
          accept=".pptx,.pdf,.doc,.docx,.png,.jpg,.jpeg"
        >
          <AddFile>
            <span>파일 추가하기</span>
            <img src={fileUploadIcon} alt="add-icon" />
          </AddFile>
        </FileUploader>
      </FileListBox>
    </>
  );
}

const FileListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 504px;
  gap: 20px;
  padding: 24px;
`;

const AddFile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 486px;
  height: 66px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 6px;
  gap: 8px;
  cursor: pointer;

  span {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;
