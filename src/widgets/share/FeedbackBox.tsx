import styled from 'styled-components';
import { FeedbackListView } from '@/entities/feedback/ui/FeedbackListView';
import { FileInfo } from '@/entities/share/share.type';

export function FeedbackBox() {
  //   const { hasFiles } = useFileState();

  const fileList: FileInfo[] = [
    {
      fileName: '디자인 시안.pptx',
      fileSize: '2.5MB',
      uploadDate: '2024.03.16',
      id: 0,
      fileType: 'pptx',
      author: '김지나',
      role: '기획자',
    },
  ];
  return (
    <>
      {/* <Container>{hasFiles ? <FeedbackView /> : <EmptyFeedback />}</Container> */}
      <Container>
        {fileList.map((file, index) => (
          <FeedbackListView key={index} fileInfo={file} />
        ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 534px;
  height: 632px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
`;
