import styled from 'styled-components';
import { FileStateProvider } from '@/entities/share/model/FileStateContext';
import { FeedbackBox } from '@/widgets/share/FeedbackBox';
import { ShareBox } from '@/widgets/share/ShareBox';

export function SharePage() {
  return (
    <Container>
      <FileStateProvider>
        <ShareBox />
        <FeedbackBox />
      </FileStateProvider>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: clamp(16px, 4.6875vw - 44px, 46px);
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  margin: 0;
`;
