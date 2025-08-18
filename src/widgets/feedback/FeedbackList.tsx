import styled from 'styled-components';

export default function FeedbackList() {
  return (
    <Container>
      <EmptyLabel>아직 피드백 남길 자료가 없습니다.</EmptyLabel>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 632px;
  padding: 24px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const EmptyLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;
