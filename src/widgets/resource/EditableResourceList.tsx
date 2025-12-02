import { Dispatch, SetStateAction, useRef } from 'react';
import styled from 'styled-components';
import { Resource } from '@/entities/resource/resource.types';
import ResourceCard from '@/entities/resource/ui/ResourceCard';
import AddFeedbackButton from '@/features/feedback/ui/AddFeedbackButton';
import { useDownloadResource } from '@/features/resource/model/useDownloadResource';
import { useResourceDeletion } from '@/features/resource/model/useResourceDeletion';
import DeleteResourceButton from '@/features/resource/ui/DeleteResourceButton';
import DeleteResourceModal from '@/features/resource/ui/DeleteResourceModal';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import ResourceAddController from './ResourceAddController';

interface EditableResourceListProps {
  resources: Resource[]; // 자료 목록 데이터
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;

  /* 선택된 자료를 상위 컴포넌트로 전달하는 콜백 함수 */
  onSelectedResource: Dispatch<SetStateAction<Resource | null>>;
}

export default function EditableResourceList({
  resources,
  isPending,
  isSuccess,
  isError,
  onSelectedResource,
}: EditableResourceListProps) {
  // 자료 삭제 로직 훅
  const {
    isDeleteModalOpen,
    toggleDeleteModal,
    openDeleteModal,
    confirmDelete,
  } = useResourceDeletion();

  const { handleDownload } = useDownloadResource();

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Container>
        {isPending &&
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} width={486} height={66} />
          ))}

        {isError && (
          <ErrorMessage>자료를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
        )}

        {isSuccess && (
          <>
            {/* 자료 목록 */}
            <ResourceList>
              {resources.map((resource) => (
                <ResourceWrapper key={resource.dataId}>
                  <ResourceCard
                    data={resource}
                    onClick={() =>
                      handleDownload(
                        resource.fileUrl,
                        `${resource.fileInfo.originalFileName}.${resource.fileInfo.fileNameExtension}`,
                      )
                    }
                    deleteButton={
                      <DeleteResourceButton
                        creatorId={resource.fileInfo.createdBy}
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(e, resource.dataId);
                        }}
                      />
                    }
                  />

                  {/* 피드백 추가 버튼 */}
                  <AddFeedbackButton
                    onClick={() => onSelectedResource(resource)}
                  />
                </ResourceWrapper>
              ))}

              {/* 스크롤 타겟 - 업로드 성공 시 이곳으로 스크롤되는 더미 태그 */}
              <ScrollTarget ref={scrollRef} />
            </ResourceList>

            {/* 자료 추가 컨트롤 위젯 */}
            <ResourceAddController
              resourceCount={resources ? resources.length : 0}
              onUploadSuccess={scrollToBottom}
            />
          </>
        )}
      </Container>

      <DeleteResourceModal
        isOpen={isDeleteModalOpen}
        toggle={toggleDeleteModal}
        onDelete={confirmDelete}
      />
    </>
  );
}

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 632px;
  padding: 24px;
  border-radius: 10px;
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

const ScrollTarget = styled.div``;

const ErrorMessage = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
`;
