import styled from 'styled-components';

export default function FallbackCard({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 518px;
  height: 222px;
  border: 1px solid ${({ theme }) => theme.colors.subLightBlue};
  padding: 16px 16px 14px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;
