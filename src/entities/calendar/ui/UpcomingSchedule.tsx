import styled from 'styled-components';

function UpcomingSchedule() {
  return (
    <Container>
      <InnerWrapper>
        <Date>2024.07.08</Date>
        <Content>메인 디자인 완성</Content>
      </InnerWrapper>
    </Container>
  );
}

export { UpcomingSchedule };

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 66px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 494px;
  height: 45px;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const Content = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;
