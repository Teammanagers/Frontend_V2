import styled from 'styled-components';
import ResourceCard from '@/entities/resource/ui/ResourceCard';
import AddFeedbackButton from '@/features/feedback/ui/AddFeedbackButton';
import DeleteResourceButton from '@/features/resource/ui/DeleteResourceButton';
import { OWNER_TEAMMANAGE_ID } from '@/shared/config/constants/team.constants';
import useToggle from '@/shared/hooks/action/useToggle';
import DeleteResourceModal from '@/features/resource/ui/DeleteResourceModal';
import { useGetResourceList } from './model/useResourceQueries';
import ResourceAddController from './ResourceAddController';
import { Dispatch, SetStateAction, useRef } from 'react';
import { Resource } from '@/entities/resource/resource.types';

export default function EditableResourceList({
  onSelectedResource,
}: {
  /* 선택된 자료를 상위 컴포넌트로 전달하는 콜백 함수 */
  onSelectedResource: Dispatch<SetStateAction<Resource | null>>;
}) {
  const { data } = useGetResourceList();
  const { isOpen, toggle } = useToggle();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Container>
        {/* 자료 목록 */}
        <ResourceList>
          {data &&
            data.map((resource) => (
              <ResourceWrapper key={resource.dataId}>
                <ResourceCard
                  data={resource}
                  deleteButton={
                    <DeleteResourceButton
                      resourceId={resource.fileInfo.createdBy}
                      myId={OWNER_TEAMMANAGE_ID}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle();
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
          resourceCount={data ? data.length : 0}
          onUploadSuccess={scrollToBottom}
        />
      </Container>

      <DeleteResourceModal isOpen={isOpen} toggle={toggle} />
    </>
  );
}

const Container = styled.section`
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
