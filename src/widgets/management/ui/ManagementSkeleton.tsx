import styled from 'styled-components';
import Skeleton from '@/shared/components/skeleton/Skeleton';

export function TeamInfoSkeleton() {
  return (
    <SkeletonWrapper height={182}>
      <Row>
        <Skeleton width="180px" height="180px" />
        <RightColumn>
          <Skeleton width="885px" height="79px" />
          <Skeleton width="885px" height="78px" />
        </RightColumn>
      </Row>
    </SkeletonWrapper>
  );
}

export function TeamMemberSkeleton() {
  return (
    <SkeletonWrapper>
      <Skeleton width="1088px" height="181px" />
    </SkeletonWrapper>
  );
}

export function ScheduleSkeleton() {
  return (
    <SkeletonWrapper>
      <Skeleton width="1088px" height="348px" />
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
