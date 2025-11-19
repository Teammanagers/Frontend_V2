import styled from 'styled-components';
import Skeleton from '@/shared/components/skeleton/Skeleton';

interface MemoListSkeletonProps {
  variant: 'empty' | 'list';
}

export default function MemoListSkeleton({ variant }: MemoListSkeletonProps) {
  if (variant === 'empty') {
    return (
      <SkeletonWrapper>
        <Skeleton width={1088} height={632} />
      </SkeletonWrapper>
    );
  }

  return (
    <ListContainer>
      {Array.from({ length: 9 }).map((_, index) => (
        <SkeletonCard key={index}>
          <Skeleton width={218} height={34} />
          <Skeleton width={273} height={34} />
          <Skeleton width={352} height={110} />
        </SkeletonCard>
      ))}
    </ListContainer>
  );
}

const SkeletonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 48px;
`;

const ListContainer = styled.div`
  width: 1088px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const SkeletonCard = styled.div`
  width: 352px;
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 11px;
`;
