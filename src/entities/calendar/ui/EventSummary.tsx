import styled from 'styled-components';
import { IEventSummaryProps } from '../calendar.types';

export default function EventSummary({
  children,
  isCompleted,
  onClick,
}: IEventSummaryProps) {
  return (
    <Title $isCompleted={isCompleted} onClick={onClick}>
      {children}
    </Title>
  );
}

const Title = styled.p<{ $isCompleted: boolean }>`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
  text-decoration: ${({ $isCompleted }) =>
    $isCompleted ? 'line-through' : 'none'};
  cursor: pointer;
`;
