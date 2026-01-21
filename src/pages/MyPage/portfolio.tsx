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
  const [selectedProjectId, setSelectedProjectId] = useState<number>(
    MOCK_PROJECTS[0].id,
  );

  const selectedProject = MOCK_PROJECTS.find(
    (project) => project.id === selectedProjectId,
  );

  return (
    <Container>
      <MypageHeader showBackButton>포트폴리오</MypageHeader>

      <ContentWrapper>
        <ProjectList
          projects={MOCK_PROJECTS}
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
        />
        {selectedProject && (
          <ProjectDetail
            projectName={selectedProject.name}
            projectDuration={selectedProject.duration}
            projectInfo={projectInfoMock}
          />
        )}
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
