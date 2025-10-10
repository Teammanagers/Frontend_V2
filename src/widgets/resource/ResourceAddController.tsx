import styled from 'styled-components';
import ResourceUploader from '@/features/resource/ui/ResourceUploader';

/**
 * 자료 추가 버튼 컨트롤러
 * - 자료가 없을 때는 안내 문구와 함께 작은 업로드 버튼을 표시
 * - 자료가 있을 때는 큰 업로드 버튼만 표시
 */
export default function ResourceAddController({
  resourceCount,
}: {
  resourceCount: number;
}) {
  return resourceCount > 0 ? (
    <ResourceUploader size="large" />
  ) : (
    <EmptyWrapper>
      <p>
        파일을 드래그하거나 아래 버튼을 클릭하여 <br /> 공유할 수 있습니다.
      </p>
      <ResourceUploader size="small" />
    </EmptyWrapper>
  );
}

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 100%;

  p {
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: ${({ theme }) => theme.colors.black};
  }
`;
