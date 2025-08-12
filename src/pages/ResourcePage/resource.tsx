import FeedbackList from '@/widgets/feedback/FeedbackList';
import EditableResourceList from '@/widgets/resource/EditableResourceList';
import styled from 'styled-components';

export function ResourcePage() {
  return (
    <Container>
      <WidgetsWrapper>
        <EditableResourceList />
        <FeedbackList />
      </WidgetsWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100vh;
`;

const WidgetsWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 85dvw;
`;
