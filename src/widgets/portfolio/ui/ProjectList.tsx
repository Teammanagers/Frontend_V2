import styled from 'styled-components';
import { MOCK_PROJECTS } from '@/entities/portfolio/model/portfolio.mock.ts';
import { ProjectCard } from '@/entities/portfolio/ui/ProjectCard.tsx';

interface ProjectListProps {
  projects: typeof MOCK_PROJECTS;
  hasProjects: boolean;
  selectedProjectId: number | null;
  onSelectProject: (id: number) => void;
}

export function ProjectList({
  projects,
  hasProjects,
  selectedProjectId,
  onSelectProject,
}: ProjectListProps) {
  if (!hasProjects) {
    return (
      <ListContainer>
        <Wrapper>
          <ContainerText>아직 끝난 프로젝트가 없습니다.</ContainerText>
        </Wrapper>
      </ListContainer>
    );
  }
  return (
    <ListContainer>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          duration={project.duration}
          selected={project.id === selectedProjectId}
          onSelect={onSelectProject}
        />
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.div`
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

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;
