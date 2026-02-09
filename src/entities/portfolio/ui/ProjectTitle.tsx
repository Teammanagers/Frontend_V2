import styled from 'styled-components';

interface ProjectTitleProps {
  title: string;
  duration: string;
}

export function ProjectTitle({ title, duration }: ProjectTitleProps) {
  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <Duration>{duration}</Duration>
      </TitleContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 480px;
  height: 34px;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;

const TitleContainer = styled.div`
  width: 230px;
  height: 27px;
  gap: 19px;
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  margin: 4.5px 0;
`;

const Duration = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;
