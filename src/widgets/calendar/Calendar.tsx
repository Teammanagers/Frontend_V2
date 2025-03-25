import styled from 'styled-components';

export default function Calendar() {
  return <Container>Calendar</Container>;
}

const Container = styled.div`
  min-width: 632px;
  height: 544px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;
