import styled from 'styled-components';
import { IEventSummaryProps } from '../calendar.types';
import ActionButton from './ActionButton';

export default function EventSummary({
  children,
  status,
  toggle,
  setModalMode,
}: IEventSummaryProps) {
  const handleClick = () => {
    setModalMode('read');
    toggle();
  };

  return (
    <Container>
      <Title $status={status} onClick={handleClick}>
        {children}
      </Title>
      {status === 'COMPLETED' || (
        <ActionButton
          buttonType="edit"
          toggle={toggle}
          setModalMode={setModalMode}
        />
      )}
    </Container>
  );
}

const Container = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 24px;
  padding-left: 8px;

  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.black};
  }
`;

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
