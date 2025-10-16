import styled from 'styled-components';
import { Resource } from '../resource.types';
import FileThumbnail from '@/entities/resource/ui/FileThumbnail';
import RoleTag from '@/shared/components/tag/RoleTag';
import ResourceMetaData from './ResourceMetaData';

interface ResourceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Resource;
  onClick?: () => void;
  deleteButton?: React.ReactNode; // 삭제 버튼 렌더링
}

export default function ResourceCard({
  data,
  onClick,
  deleteButton,
}: ResourceCardProps) {
  return (
    <Container role="button" onClick={onClick}>
      <ThumbnailWithInfo>
        <FileThumbnail extension={data.fileInfo.fileNameExtension} />

        <ResourceInfoWrapper>
          <Title>
            {data.fileInfo.originalFileName}.{data.fileInfo.fileNameExtension}
          </Title>
          <ResourceMetaData
            fileSize={data.fileInfo.fileSize}
            createdAt={data.fileInfo.createdAt}
          />
        </ResourceInfoWrapper>
      </ThumbnailWithInfo>

      <TagAndDeleteWrapper>
        {/* 업로드 한 사람 이름으로 수정 예정 */}
        <RoleTag height={28}>김예안</RoleTag>
        {deleteButton}
      </TagAndDeleteWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 66px;
  height: fit-content;
  padding: 13.5px 18px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const ThumbnailWithInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  height: 100%;
`;

const ResourceInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
`;

const Title = styled.strong`
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagAndDeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;
