import styled from 'styled-components';
import { getProgressWidth } from '../lib/getProgressWidth';
import { ITeamProgressStatus } from '../todo.type';

function ProgressBar({
  teamProgress,
}: {
  teamProgress: ITeamProgressStatus[];
}) {
  return (
    <Container>
      <TODO $todoProgress={getProgressWidth('진행 전', teamProgress)} />
      <PROCEEDING
        $proceedingProgress={getProgressWidth('진행 중', teamProgress)}
      />
      <COMPLETED $completedProgress={getProgressWidth('완료', teamProgress)} />
    </Container>
  );
}

export { ProgressBar };

const Container = styled.section`
  display: flex;
  width: 100%;
  height: 12px;

  & div {
    border-radius: 76px;
  }
`;

const TODO = styled.div<{ $todoProgress: number | undefined }>`
  width: ${({ $todoProgress }) => $todoProgress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.silver};
  transition: width 0.4s ease-in-out;
`;

const PROCEEDING = styled.div<{ $proceedingProgress: number | undefined }>`
  width: ${({ $proceedingProgress }) => $proceedingProgress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.subLightBlue};
  transition: width 0.4s ease-in-out;
`;

const COMPLETED = styled.div<{ $completedProgress: number | undefined }>`
  width: ${({ $completedProgress }) => $completedProgress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.mainBlue};
  transition: width 0.4s ease-in-out;
`;
