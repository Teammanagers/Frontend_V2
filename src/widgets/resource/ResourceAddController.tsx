import styled from 'styled-components';
import FileUploader from '@/shared/components/fileUploader/FileUploader';
import AddResourceButton from '@/features/resource/ui/AddResourceButton';
import { useUploadResource } from '@/features/resource/model/useResourceQueries';
import { queryClient } from '@/shared/config/queryClient';

interface ResourceAddControllerProps {
  /* 현재 자료 개수 */
  resourceCount: number;
  /* 업로드 성공 시 호출되는 콜백함수 */
  onUploadSuccess: () => void;
}

/**
 * 자료 추가 버튼 컨트롤러
 * - 자료가 없을 때는 안내 문구와 함께 작은 업로드 버튼을 표시
 * - 자료가 있을 때는 큰 업로드 버튼만 표시
 */
export default function ResourceAddController({
  resourceCount,
  onUploadSuccess,
}: ResourceAddControllerProps) {
  const { mutate: uploadResource, isPending } = useUploadResource();

  // 파일 선택 핸들러
  const handleFileSelect = (file: File) => {
    uploadResource(file, {
      onSuccess: async () => {
        await queryClient.refetchQueries({ queryKey: ['resource', 'list'] });
        // 렌더링이 모두 완료된 후에 스크롤 콜백 호출
        setTimeout(() => {
          onUploadSuccess();
        }, 0);
      },
    });
  };

  return resourceCount > 0 ? (
    <FileUploader onFileSelect={handleFileSelect}>
      {({ triggerUpload }) => (
        <AddResourceButton
          size="large"
          onClick={triggerUpload}
          disabled={isPending}
        />
      )}
    </FileUploader>
  ) : (
    <EmptyWrapper>
      <p>
        파일을 드래그하거나 아래 버튼을 클릭하여 <br /> 공유할 수 있습니다.
      </p>
      <FileUploader onFileSelect={handleFileSelect}>
        {({ triggerUpload }) => (
          <AddResourceButton
            size="small"
            onClick={triggerUpload}
            disabled={isPending}
          />
        )}
      </FileUploader>
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
