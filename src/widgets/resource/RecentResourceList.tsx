import styled from 'styled-components';
import resourceData from '@/entities/resource/resource.json';
import ResourceCard from '@/entities/resource/ui/ResourceCard';

export default function RecentResourceList() {
  const data = resourceData.dataList.slice(0, 3);

  return (
    <Container>
      <ResourceList>
        {data.map((resource) => (
          <ResourceCard key={resource.dataId} resourceInfo={resource} />
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
