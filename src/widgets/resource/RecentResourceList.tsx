import styled from 'styled-components';
import ResourceCard from '@/entities/resource/ui/ResourceCard';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import { useGetResourceList } from '../../entities/resource/model/useResourceQueries';

export default function RecentResourceList() {
  const { data, isPending } = useGetResourceList();

  if (isPending) return <Skeleton width={518} height={222} />;

  return (
    <Container>
      <ResourceList>
        {data &&
          data
            .slice(0, 3)
            .map((resource) => (
              <ResourceCard key={resource.dataId} data={resource} />
            ))}
      </ResourceList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 518px;
  height: 274px;
`;

const ResourceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-height: 222px;
`;
