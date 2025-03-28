import styled from 'styled-components';
import { IEventSummaryProps } from '../calendar.types';
import ActionButton from './ActionButton';

export default function EventSummary({ children }: IEventSummaryProps) {
  return (
    <Container>
      <p>{children}</p>
      <ActionButton buttonType="edit" />
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 24px;
`;
