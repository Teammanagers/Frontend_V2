import styled from 'styled-components';
import { getProgressWidth, getTotalCount } from '../lib/getProgressWidth';
import { ITeamProgressStatus } from '../todo.type';

function ProgressBar({
  teamProgress,
}: {
  teamProgress: ITeamProgressStatus[];
}) {
  const totalCount = getTotalCount(teamProgress);

  return (
    <Container $totalCount={totalCount}>
      <TODO $todoProgress={getProgressWidth('진행 전', teamProgress)} />
      <PROCEEDING
        $proceedingProgress={getProgressWidth('진행 중', teamProgress)}
      />
      <COMPLETED $completedProgress={getProgressWidth('완료', teamProgress)} />
    </Container>
  );
}

export { ProgressBar };

const Container = styled.section<{ $totalCount: number }>`
  display: flex;
  width: 100%;
  height: 12px;
  border-radius: 76px;
  background-color: ${({ theme, $totalCount }) =>
    $totalCount === 0 ? theme.colors.white : 'transparent'};
  overflow: hidden;
`;

const BarSegment = styled.div<{ $width?: number }>`
  width: ${({ $width }) => $width ?? 0}%;
  height: 100%;
  transition: width 0.5s ease-in-out;
`;

const TODO = styled(BarSegment).attrs<{ $todoProgress: number }>((props) => ({
  $width: props.$todoProgress,
}))`
  background-color: ${({ theme }) => theme.colors.silver};
`;

const PROCEEDING = styled(BarSegment).attrs<{ $proceedingProgress: number }>(
  (props) => ({
    $width: props.$proceedingProgress,
  }),
)`
  background-color: ${({ theme }) => theme.colors.subLightBlue};
`;
const COMPLETED = styled(BarSegment).attrs<{ $completedProgress: number }>(
  (props) => ({
    $width: props.$completedProgress,
  }),
)`
  background-color: ${({ theme }) => theme.colors.mainBlue};
`;
