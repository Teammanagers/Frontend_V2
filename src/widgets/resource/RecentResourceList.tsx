import styled from 'styled-components';
import FallbackCard from '@/entities/main/ui/FallbackCard';
import ResourceCard from '@/entities/resource/ui/ResourceCard';
import { useDownloadResource } from '@/features/resource/model/useDownloadResource';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import { useGetResourceList } from '../../entities/resource/model/useResourceQueries';

export default function RecentResourceList() {
  const { data, isPending, isSuccess, isError } = useGetResourceList();
  const { handleDownload } = useDownloadResource();

  if (isPending) return <Skeleton width="518px" height="222px" />;
  if (isError) return <FallbackCard>자료를 불러올 수 없습니다.</FallbackCard>;
  if (isSuccess && data.length === 0)
    return <FallbackCard>최근 업데이트 된 자료가 없습니다.</FallbackCard>;

  return (
    <Container>
      <ResourceList>
        {isSuccess &&
          data
            .slice(0, 3)
            .map((resource) => (
              <ResourceCard
                key={resource.dataId}
                data={resource}
                onClick={() =>
                  handleDownload(
                    resource.fileUrl,
                    `${resource.fileInfo.originalFileName}.${resource.fileInfo.fileNameExtension}`,
                  )
                }
              />
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
