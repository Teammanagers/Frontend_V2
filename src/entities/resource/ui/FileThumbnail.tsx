import styled from 'styled-components';
import PDFIcon from '@/shared/assets/resource/thumbnail-pdf.svg?react';

// 파일 확장자에 따라 다른 아이콘 처리 필요
export default function FileThumbnail({ type }: { type: 'pdf' | 'image' }) {
  return <Container>{type === 'pdf' ? <PDFIcon /> : null}</Container>;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
