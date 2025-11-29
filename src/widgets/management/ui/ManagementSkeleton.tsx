import styled from 'styled-components';
import Skeleton from '@/shared/components/skeleton/Skeleton';

export function TeamInfoSkeleton() {
  return (
    <SkeletonWrapper height={182}>
      <Row>
        <Skeleton width={180} height={180} />
        <RightColumn>
          <Skeleton width={885} height={79} />
          <Skeleton width={885} height={78} />
        </RightColumn>
      </Row>
    </SkeletonWrapper>
  );
}

export function TeamMemberSkeleton() {
  return (
    <SkeletonWrapper>
      <Skeleton width={1088} height={181} />
    </SkeletonWrapper>
  );
}

export function ScheduleSkeleton() {
  return (
    <SkeletonWrapper>
      <Skeleton width={1088} height={348} />
    </SkeletonWrapper>
  );
}

const SkeletonWrapper = styled.div<{ height?: number }>`
  width: 1088px;
  display: flex;
  height: ${({ height }) => height}px;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  gap: 23px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 25px;
`;
