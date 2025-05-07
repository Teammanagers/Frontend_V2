import styled from 'styled-components';
import CheckIcon from '@/shared/assets/todo/check.svg?react';
import { IProgressStatusBadge } from '../todo.type';

//진행 전, 진행 중, 완료 상태를 나타내는 배지 컴포넌트

function ProgressStatusBadge({ status }: { status: IProgressStatusBadge }) {
  return (
    <Container>
      <StatusLabel $status={status.title}>
        {status.title === '진행중' ? (
          <ProceedingBarWrapper>
            <ProceedingBar />
          </ProceedingBarWrapper>
        ) : status.title === '진행 전' || status.title === '완료' ? (
          <IconWrapper>
            <CheckIcon />
          </IconWrapper>
        ) : null}
        {status.title}
      </StatusLabel>
      <StatusCounter>{status.count}</StatusCounter>
    </Container>
  );
}

export { ProgressStatusBadge };

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const StatusLabel = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: auto;
  height: 32px;
  padding: 4px 14px;
  border: ${({ $status }) =>
    $status === '전체' ? '2px solid #5C9EFF' : 'none'};
  border-radius: 100px;
  background-color: ${({ $status, theme }) =>
    $status === '전체'
      ? theme.colors.white
      : $status === '진행 전'
        ? theme.colors.silver
        : $status === '진행중'
          ? theme.colors.subLightBlue
          : theme.colors.mainBlue};

  font-size: 16px;
  font-weight: 400;
  color: ${({ $status, theme }) =>
    $status === '전체' || $status === '진행중'
      ? theme.colors.mainBlue
      : theme.colors.white};
`;

const ProceedingBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const ProceedingBar = styled.div`
  width: 14px;
  height: 3px;
  border-radius: 120px;
  background-color: ${({ theme }) => theme.colors.mainBlue};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const StatusCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 30px;
  padding: 4px;
  border-radius: 100px;
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;
