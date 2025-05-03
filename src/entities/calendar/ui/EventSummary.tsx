import styled from 'styled-components';
import { IEventSummaryProps } from '../calendar.types';

export default function EventSummary({
  children,
  status,
  onClick,
}: IEventSummaryProps) {
  return (
    <Title $status={status} onClick={onClick}>
      {children}
    </Title>
  );
}

const Title = styled.p<{ $status: string }>`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
  text-decoration: ${({ $status }) =>
    $status === 'COMPLETED' ? 'line-through' : 'none'};
  cursor: pointer;
`;
