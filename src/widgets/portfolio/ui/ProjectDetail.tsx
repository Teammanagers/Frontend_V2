import styled from 'styled-components';
import { ProjectInfoSection } from '@/entities/portfolio/ui/ProjectInfoSection.tsx';
import { ProjectTitle } from '@/entities/portfolio/ui/ProjectTitle.tsx';

interface ProjectDetailProps {
  projectName: string;
  projectDuration: string;
  projectInfo: {
    id: number;
    title: string;
    tags: string[];
  }[];
}

export function ProjectDetail({
  projectName,
  projectDuration,
  projectInfo,
}: ProjectDetailProps) {
  return (
    <DetailContainer>
      <ProjectTitle title={projectName} duration={projectDuration} />
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
