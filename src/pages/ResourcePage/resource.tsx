import { useState } from 'react';
import styled from 'styled-components';
import { useGetResourceList } from '@/entities/resource/model/useResourceQueries';
import { Resource } from '@/entities/resource/resource.types';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import FeedbackWidget from '@/widgets/feedback/FeedbackWidget';
import EditableResourceList from '@/widgets/resource/EditableResourceList';

export function ResourcePage() {
  const {
    data: resources,
    isPending,
    isSuccess,
    isError,
  } = useGetResourceList(); // 자료 목록 조회

  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null,
  );

  return (
    <Container>
      <WidgetsWrapper>
        {/* 자료 위젯 */}
        <EditableResourceList
          resources={resources || []}
          isPending={isPending}
          isSuccess={isSuccess}
          isError={isError}
          onSelectedResource={setSelectedResource}
        />

        {/* 피드백 위젯 */}
        {isPending && <Skeleton width="534px" height="632px" />}
        {isSuccess && (
          <FeedbackWidget
            selectedResource={selectedResource}
            hasResource={resources?.length > 0}
          />
        )}
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
