import styled from 'styled-components';
import resourceData from '@/entities/resource/resource.json';
import ResourceCard from '@/entities/resource/ui/ResourceCard';
import AddFeedbackButton from '@/features/feedback/ui/AddFeedbackButton';
import AddResourceButton from '@/features/resource/ui/AddResourceButton';
import DeleteResourceButton from '@/features/resource/ui/DeleteResourceButton';
import { OWNER_TEAMMANAGE_ID } from '@/shared/config/constants/team.constants';

export default function EditableResourceList() {
  const data = resourceData.dataList;

  return (
    <Container>
      <ResourceList>
        {data.map((resource) => (
          <ResourceWrapper>
            <ResourceCard
              resourceInfo={resource}
              actions={
                <DeleteResourceButton
                  resourceId={resource.fileInfo.createdBy}
                  myId={OWNER_TEAMMANAGE_ID}
                />
              }
            />
            <AddFeedbackButton />
          </ResourceWrapper>
        ))}
      </ResourceList>

      <AddResourceButton />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 632px;
  padding: 24px;
  borde-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ResourceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-height: 495px;
  overflow-y: auto;
`;

const ResourceWrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 18px;
`;
