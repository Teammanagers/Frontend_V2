import { useState } from 'react';
import styled from 'styled-components';
import { ProjectCard } from '@/entities/mypage/ui/ProjectCard.tsx';

const MOCK_PROJECTS = [
  {
    id: 1,
    name: '팀매니저 ver.1',
    duration: '2024.07 ~ 2024.08',
  },
  {
    id: 2,
    name: '팀매니저 ver.2',
    duration: '2024.09 ~ ing',
  },
];

export function ProjectList() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    MOCK_PROJECTS[0].id,
  );
  return (
    <ListContainer>
      {MOCK_PROJECTS.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          duration={project.duration}
          selected={project.id === selectedProjectId}
          onSelect={setSelectedProjectId}
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
