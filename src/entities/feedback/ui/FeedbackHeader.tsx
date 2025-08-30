import styled from 'styled-components';
import ResourceMetaData from '@/entities/resource/ui/ResourceMetaData';
import resourceData from '@/entities/resource/resource.json';
import RoleTag from '@/shared/components/tag/RoleTag';

export default function FeedbackHeader() {
  const data = resourceData.dataList[0];

  return (
    <Container>
      <InnerWrapper>
        <Title>제목입니다2</Title>
        <ResourceMetaData
          fileSize={data.fileInfo.fileSize}
          createdAt={data.fileInfo.createdAt}
        />
        <RoleTag variants="filled" height={24}>
          작성자
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
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;
