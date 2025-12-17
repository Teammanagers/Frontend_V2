import styled from 'styled-components';
import { Resource } from '@/entities/resource/resource.types';
import ResourceMetaData from '@/entities/resource/ui/ResourceMetaData';
import RoleTag from '@/shared/components/tag/RoleTag';

export default function FeedbackHeader({
  selectedResource,
}: {
  selectedResource: Resource;
}) {
  return (
    <Container>
      <InnerWrapper>
        <Title>{selectedResource.fileInfo.originalFileName}</Title>
        <ResourceMetaData
          fileSize={selectedResource.fileInfo.fileSize}
          createdAt={selectedResource.fileInfo.createdAt}
        />
        <RoleTag variants="filled" height={24}>
          {selectedResource.tagDto?.name}
        </RoleTag>
      </InnerWrapper>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 38px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;

const InnerWrapper = styled.div`
  display: flex;
  gap: 19px;
`;

const Title = styled.h2`
  max-width: 270px;
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.black};
`;
