import styled from 'styled-components';
import { formatFileSize } from '../lib/formatFileSize';
import dayjs from 'dayjs';

interface IResourceMetaDataProps {
  fileSize: number;
  createdAt: string;
}

export default function ResourceMetaData({
  fileSize,
  createdAt,
}: IResourceMetaDataProps) {
  return (
    <Container>
      <span>{formatFileSize(fileSize)}</span>•
      <span>{dayjs(createdAt).format('YYYY.MM.DD')}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;
