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
  max-width: 210px;
  min-width: 0;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  white-space: nowrap; /* 한 줄로만 표시 */
  overflow: hidden; /* 넘치는 부분 숨김 */
  text-overflow: ellipsis; /* 넘치는 부분에 ... 표시 */
`;
