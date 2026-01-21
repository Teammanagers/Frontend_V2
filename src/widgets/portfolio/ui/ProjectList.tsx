import styled from 'styled-components';
import { MOCK_PROJECTS } from '@/entities/portfolio/model/portfolio.mock.ts';
import { ProjectCard } from '@/entities/portfolio/ui/ProjectCard.tsx';

interface ProjectListProps {
  projects: typeof MOCK_PROJECTS;
  selectedProjectId: number;
  onSelectProject: (id: number) => void;
}

export function ProjectList({
  projects,
  selectedProjectId,
  onSelectProject,
}: ProjectListProps) {
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
