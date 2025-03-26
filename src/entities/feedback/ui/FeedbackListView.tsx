// widgets/FeedbackListView/FeedbackListView.tsx
import styled from 'styled-components';
import { useFeedback } from '@/entities/feedback/model/useFeedback';
import { FeedbackForm } from '@/entities/feedback/ui/FeedbackForm';
import { FeedbackList } from '@/entities/feedback/ui/FeedbackList';
import dotIcon from '@/shared/assets/icons/share/dot.svg';
import { FileInfo } from '../../share/share.type';

interface FeedbackListViewProps {
  fileInfo: FileInfo;
}

export function FeedbackListView({ fileInfo }: FeedbackListViewProps) {
  const { comment, comments, handleInputChange, handleSubmit } = useFeedback();

  return (
    <Container>
      <FeedbackInfo>
        <FileName>{fileInfo.fileName}</FileName>
        <FileProperties>
          {fileInfo.fileSize} <img src={dotIcon} alt="dot-icon" />{' '}
          {fileInfo.uploadDate}
        </FileProperties>
        <RoleContainer>
          <p>{fileInfo.role}</p>
        </RoleContainer>
      </FeedbackInfo>

      {/* 입력 폼 */}
      <FeedbackForm
        comment={comment}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />

      {/* 피드백 목록 */}
      <FeedbackList comments={comments} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 24px;
  gap: 20px;
`;

const FeedbackInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: flex-start;
  gap: 10px;
  width: 486px;
  height: 37px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;

const FileName = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const FileProperties = styled.p`
  display: flex;
  flex-direction: row;
  gap: 6px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const RoleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 24px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.background};
  gap: 8px;
  padding: 8px;

  p {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: 12px;
    font-weight: 500;
  }
`;

// import styled from 'styled-components';
// import dotIcon from '@/shared/assets/icons/share/dot.svg';
// import sendFeedbackIcon from '@/shared/assets/icons/share/send-feedback.svg';
// import { FileInfo } from '../share.type';
// import { CommentItem } from './CommentItem';

// interface FileItemProps {
//   fileInfo: FileInfo;
// }

// function FeedbackListView({ fileInfo }: FileItemProps) {
//   return (
//     <Container>
//       <FeedbackInfo>
//         <FileName>{fileInfo.fileName}</FileName>
//         <FileProperties>
//           {fileInfo.fileSize} <img src={dotIcon} alt="dot-icon" />{' '}
//           {fileInfo.uploadDate}
//         </FileProperties>
//         <RoleContainer>
//           <p>{fileInfo.role}</p>
//         </RoleContainer>
//       </FeedbackInfo>

//       <ContentBox>
//         <InputBox placeholder="피드백 내용을 입력해주세요"></InputBox>
//         <SendBox>
//           <img src={sendFeedbackIcon} alt="send-feedback-icon" />
//         </SendBox>
//       </ContentBox>

//       <CommentItem fileInfo={fileInfo} />
//     </Container>
//   );
// }

// export { FeedbackListView };

// const Container = styled.div`
//   display: flex;
//   width: 100%;
//   height: 100%;
//   flex-direction: column;
//   padding: 24px;
//   gap: 20px;
// `;

// const FeedbackInfo = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-items: flex-start;
//   gap: 10px;
//   width: 486px;
//   height: 37px;
//   border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
// `;

// const FileName = styled.p`
//   font-size: 18px;
//   font-weight: 700;
//   color: ${({ theme }) => theme.colors.black};
// `;

// const FileProperties = styled.p`
//   display: flex;
//   flex-direction: row;
//   gap: 6px;
//   font-size: 12px;
//   font-weight: 400;
//   color: ${({ theme }) => theme.colors.darkGray};
// `;

// const RoleContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 50px;
//   height: 24px;
//   border-radius: 3px;
//   background-color: ${({ theme }) => theme.colors.background};
//   gap: 8px;
//   padding: 8px;

//   p {
//     color: ${({ theme }) => theme.colors.mainBlue};
//     font-size: 12px;
//     font-weight: 500;
//   }
// `;

// const ContentBox = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   width: 486px;
//   height: 76px;
//   gap: 18px;
// `;

// const InputBox = styled.textarea`
//   width: 420px;
//   height: 76px;
//   padding: 8px 12px;
//   border: 1px solid ${({ theme }) => theme.colors.lightGray};
//   border-radius: 4px;

//   &::placeholder {
//     color: ${({ theme }) => theme.colors.darkGray};
//     font-size: 12px;
//     font-weight: 400;
//     line-height: 1.4;
//   }
// `;

// const SendBox = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 48px;
//   height: 32px;
//   background-color: ${({ theme }) => theme.colors.mainBlue};
//   border-radius: 4px;
//   padding: 7px 16px;
// `;
