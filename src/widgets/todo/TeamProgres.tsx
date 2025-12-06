import styled from 'styled-components';
import { ITeamProgressStatus } from '@/entities/todo/todo.type';
import { ProgressBar, ProgressStatusBadge } from '@/entities/todo/ui';

interface TeamProgresProps {
  teamProgress: ITeamProgressStatus[];
  isPending: boolean;
  isSuccess: boolean;
}

// 팀원 투두 진행 상황을 알수 있는 컴포넌트 위젯
export default function TeamProgres({
  teamProgress,
  isPending,
  isSuccess,
}: TeamProgresProps) {
  return (
    <Container>
      <StatusLabelWrapper>
        {teamProgress.map((status) => (
          <ProgressStatusBadge status={status} key={`${status}`} />
        ))}
      </StatusLabelWrapper>

      {isPending && <ProgressBarSkeleton />}
      {isSuccess && <ProgressBar teamProgress={teamProgress} />}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  min-width: 900px;
  width: 70vw;
`;

const StatusLabelWrapper = styled.section`
  display: flex;
  gap: 48px;
`;

const ProgressBarSkeleton = styled.div`
  width: 100%;
  height: 12px;
  border-radius: 76px;
  background-color: ${({ theme }) => theme.colors.white};
`;
