import styled from 'styled-components';
import FeedbackWidget from '@/widgets/feedback/FeedbackWidget';
import EditableResourceList from '@/widgets/resource/EditableResourceList';
import { useState } from 'react';
import { Resource } from '@/entities/resource/resource.types';

export function ResourcePage() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null,
  );

  return (
    <Container>
      <WidgetsWrapper>
        {/* 자료 위젯 */}
        <EditableResourceList onSelectedResource={setSelectedResource} />

        {/* 피드백 위젯 */}
        <FeedbackWidget selectedResource={selectedResource} />
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
