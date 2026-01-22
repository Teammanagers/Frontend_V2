import { useState } from 'react';
import styled from 'styled-components';
import {
  MOCK_PROJECTS,
  projectInfoMock,
} from '@/entities/portfolio/model/portfolio.mock.ts';
import MypageHeader from '@/widgets/mypage/MypageHeader.tsx';
import { ProjectDetail } from '@/widgets/portfolio/ui/ProjectDetail.tsx';
import { ProjectList } from '@/widgets/portfolio/ui/ProjectList.tsx';

export default function Portfolio() {
  const projects = MOCK_PROJECTS;
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );

  // 프로젝트 존재 여부
  const hasProjects = projects.length > 0;

  const selectedProject =
    selectedProjectId === null
      ? null
      : (projects.find((project) => project.id === selectedProjectId) ?? null);

  return (
    <Container>
      <MypageHeader showBackButton>포트폴리오</MypageHeader>

      <ContentWrapper>
        <ProjectList
          projects={projects}
          hasProjects={hasProjects}
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
        />
        <ProjectDetail
          hasProjects={hasProjects}
          selectedProject={selectedProject}
          projectInfo={projectInfoMock}
        />
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 95%;
  margin: 46px 0 74px 5%;
  gap: 20px;
`;
