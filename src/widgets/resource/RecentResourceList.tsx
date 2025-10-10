import styled from 'styled-components';
import { RoutingButton } from '@/entities/main/ui';
import ResourceCard from '@/entities/resource/ui/ResourceCard';
import { useGetResourceList } from './model/useResourceQueries';

export default function RecentResourceList() {
  const { data } = useGetResourceList();

  return (
    <Container>
      <RoutingButton url="/resource">최근 업데이트 된 자료</RoutingButton>

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
