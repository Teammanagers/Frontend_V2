import styled from 'styled-components';
import { ProjectInfoSection } from '@/entities/portfolio/ui/ProjectInfoSection.tsx';
import { ProjectTitle } from '@/entities/portfolio/ui/ProjectTitle.tsx';
import { ContainerText, Wrapper } from '@/widgets/portfolio/ui/ProjectList.tsx';

interface ProjectDetailProps {
  hasProjects: boolean;
  selectedProject: {
    name: string;
    duration: string;
  } | null;
  projectInfo: {
    id: number;
    title: string;
    tags: string[];
  }[];
}

export function ProjectDetail({
  hasProjects,
  selectedProject,
  projectInfo,
}: ProjectDetailProps) {
  // 프로젝트가 아예 없을 때
  if (!hasProjects) {
    return (
      <DetailContainer>
        <Wrapper>
          <ContainerText>아직 확인할 프로젝트가 없습니다.</ContainerText>
        </Wrapper>
      </DetailContainer>
    );
  }

  // 프로젝트는 존재, 선택 전
  if (!selectedProject) {
    return (
      <DetailContainer>
        <Wrapper>
          <ContainerText>프로젝트를 클릭해 확인할 수 있습니다.</ContainerText>
        </Wrapper>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <ProjectTitle
        title={selectedProject.name}
        duration={selectedProject.duration}
      />
      {projectInfo.map((item) => (
        <ProjectInfoSection
          key={item.id}
          id={item.id}
          title={item.title}
          tags={item.tags}
        />
      ))}
      <div>공유했던 파일 </div>
    </DetailContainer>
  );
}

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 534px;
  height: 562px;
  padding: 24px 0;
  gap: 20px;
  background: white;
  border-radius: 10px;
`;
