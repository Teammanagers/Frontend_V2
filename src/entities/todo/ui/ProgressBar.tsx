import styled from 'styled-components';
import { ITeamProgressStatus } from '../todo.type';
import { getProgressWidth } from '../lib/getProgressWidth';

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
  border-radius: 76px;
`;

const TODO = styled.div<{ $todoProgress: number }>`
  width: ${({ $todoProgress }) => $todoProgress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.silver};
  border-radius: 76px 0 0 76px;
  transition: width 0.5s ease-in-out;
`;

const PROCEEDING = styled.div<{ $proceedingProgress: number }>`
  width: ${({ $proceedingProgress }) => $proceedingProgress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.subLightBlue};
  transition: width 0.5s ease-in-out;
`;

const COMPLETED = styled.div<{ $completedProgress: number }>`
  width: ${({ $completedProgress }) => $completedProgress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.mainBlue};
  border-radius: 0 76px 76px 0;
  transition: width 0.5s ease-in-out;
`;
