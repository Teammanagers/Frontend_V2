import styled from 'styled-components';

interface IEventSummaryProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function EventSummary({
  children,
  onClick,
}: IEventSummaryProps) {
  return <Title onClick={onClick}>{children}</Title>;
}

const Title = styled.p`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
`;
