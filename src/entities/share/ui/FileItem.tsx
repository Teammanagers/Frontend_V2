import styled from 'styled-components';
import dotIcon from '@/shared/assets/icons/share/dot.svg';
import feedbackIcon from '@/shared/assets/icons/share/feedback.svg';
import wordIcon from '@/shared/assets/icons/share/word.svg';
import { FileInfo } from '../share.type';

interface FileItemProps {
  fileInfo: FileInfo;
}

function FileItem({ fileInfo }: FileItemProps) {
  return (
    <Container>
      {/* 파일 정보 */}
      <FileBox>
        <Files>
          <img src={wordIcon} alt="word-icon" />
          <FileDetails>
            <FileName>{fileInfo.fileName}</FileName>
            <FileProperties>
              {fileInfo.fileSize} <img src={dotIcon} alt="dot-icon" />{' '}
              {fileInfo.uploadDate}
            </FileProperties>
          </FileDetails>
        </Files>
        {/* 역할 */}
        <RoleContainer>
          <p>{fileInfo.role}</p>
        </RoleContainer>
      </FileBox>

      {/* 피드백 버튼 */}
      <FeedbackButton>
        <img src={feedbackIcon} alt="feedback-icon" />
        <span>피드백</span>
      </FeedbackButton>
    </Container>
  );
}

export { FileItem };

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 486px;
  height: 66px;

  gap: 18px;
`;

const FileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: space-between;
  width: 390px;
  padding: 12px 18px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 6px;
`;

const Files = styled.div`
  width: 304px;
  height: 39px;
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const FileDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

const FileName = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;

const FileProperties = styled.p`
  display: flex;
  flex-direction: row;
  gap: 6px;
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const RoleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 28px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.background};
  gap: 8px;
  padding: 8px;

  p {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: 10px;
    font-weight: 500;
  }
`;

const FeedbackButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 78px;
  height: 66px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  flex-direction: column;
  gap: 6px;
  cursor: pointer;

  span {
    font-size: 10px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;
