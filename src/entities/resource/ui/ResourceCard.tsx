import dayjs from 'dayjs';
import styled from 'styled-components';
import { ResourceInfoResponse } from '../resource.types';
import FileThumbnail from '@/entities/resource/ui/FileThumbnail';
import RoleTag from '@/shared/components/tag/RoleTag';
import { formatFileSize } from '../lib/formatFileSize';

interface ResourceCardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'large' | 'medium';
  resourceInfo: ResourceInfoResponse;
  actions?: React.ReactNode; // 삭제 버튼 등 추가 액션을 위한 props
}

export default function ResourceCard({
  size = 'medium',
  resourceInfo,
  actions,
  ...props
}: ResourceCardProps) {
  return (
    <Container $size={size} {...props}>
      <ThumbnailWithInfo>
        <FileThumbnail type="pdf" />

        <ResourceInfoWrapper>
          <Title>
            {resourceInfo.fileInfo.originalFileName}.
            {resourceInfo.fileInfo.fileNameExtension}
          </Title>

          <MetaDataWrapper>
            <span>{formatFileSize(resourceInfo.fileInfo.fileSize)}</span>•
            <span>
              {dayjs(resourceInfo.fileInfo.createdAt).format('YYYY.MM.DD')}
            </span>
          </MetaDataWrapper>
        </ResourceInfoWrapper>
      </ThumbnailWithInfo>

      <TagAndDeleteWrapper>
        {/* 업로드 한 사람 이름으로 수정 예정 */}
        <RoleTag>김예안</RoleTag>
        {actions}
      </TagAndDeleteWrapper>
    </Container>
  );
}

const Container = styled.button<{ $size: 'large' | 'medium' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 66px;
  padding: 13.5px 18px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.white};
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
font-size: 12px;
font-weight: 400
color: ${({ theme }) => theme.colors.black};
`;

const MetaDataWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const TagAndDeleteWrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
`;
