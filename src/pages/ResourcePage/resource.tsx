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
        {/* 피드백 위젯 */}
        {isPending &&
          Array.from({ length: 2 }).map((_, idx) => (
            <Skeleton key={idx} width="100%" height="632px" />
          ))}

        {isError && (
          <>
            <ContentSection>
              자료를 불러오는 중 오류가 발생했습니다.
            </ContentSection>
            <ContentSection>
              피드백을 불러오는 중 오류가 발생했습니다.
            </ContentSection>
          </>
        )}

        {/* 자료 위젯 */}
        {isSuccess && (
          <>
            <EditableResourceList
              resources={resources || []}
              onSelectedResource={setSelectedResource}
            />
            <FeedbackWidget
              selectedResource={selectedResource}
              hasResource={resources?.length > 0}
            />
          </>
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

const ContentSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 632px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;
