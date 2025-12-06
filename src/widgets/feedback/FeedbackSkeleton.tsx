import styled from 'styled-components';
import Skeleton from '@/shared/components/skeleton/Skeleton';

export default function FeedbackSkeleton() {
  return (
    <SkeletonWrapper>
      <HeaderArea>
        <Skeleton width="250px" height="38px" />
        <Skeleton width="100px" height="38px" />
        <Skeleton width="50px" height="38px" />
      </HeaderArea>

      <FormArea>
        <Skeleton width="100%" height="76px" />
        <Skeleton width="48px" height="36px" />
      </FormArea>

      <ListArea>
        <Skeleton width="100%" height="67px" />
        <Skeleton width="100%" height="67px" />
        <Skeleton width="100%" height="67px" />
      </ListArea>
    </SkeletonWrapper>
  );
}

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19px;
`;

const HeaderArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 19px;
`;

const FormArea = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;

const ListArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
`;
