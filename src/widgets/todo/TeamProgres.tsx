import { statusLabel } from '@/entities/todo/model/status-label';
import { StatusBadge } from '@/entities/todo/ui';
import styled from 'styled-components';

// 팀원 투두 진행 상황을 알수 있는 컴포넌트 위젯

export default function TeamProgres() {
  return (
    <Container>
      <StatusLabelWrapper>
        {statusLabel.map((status) => (
          <StatusBadge status={status} key={`${status}`} />
        ))}
      </StatusLabelWrapper>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 900px;
`;

const StatusLabelWrapper = styled.section`
  display: flex;
  gap: 48px;
`;
