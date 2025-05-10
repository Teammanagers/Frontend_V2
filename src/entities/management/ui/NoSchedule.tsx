import styled from 'styled-components';

export const NoSchedule = () => {
  return <Container>아직 등록된 일정이 없어요!</Container>;
};

const Container = styled.div`
  width: 100%;
  height: 281px;
  background: white;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;
