import styled from 'styled-components';

export function EmptyFeedback() {
  return (
    <Container>
      <NoticeText>아직 피드백 남길 자료가 없습니다.</NoticeText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NoticeText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;
