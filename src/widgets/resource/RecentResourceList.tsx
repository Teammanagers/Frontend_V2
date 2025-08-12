import styled from 'styled-components';
import { RoutingButton } from '@/entities/main/ui';
import resourceData from '@/entities/resource/resource.json';
import ResourceCard from '@/entities/resource/ui/ResourceCard';

export default function RecentResourceList() {
  const data = resourceData.dataList.slice(0, 3);

  return (
    <Container>
      <RoutingButton url="/resource">최근 업데이트 된 자료</RoutingButton>

      <ResourceList>
        {data.map((resource) => (
          <ResourceCard resourceInfo={resource} />
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
