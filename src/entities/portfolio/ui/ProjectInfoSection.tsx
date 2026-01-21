import styled from 'styled-components';
import { Tag } from '@/shared/ui/Tag/Tag.tsx';

interface ProjectInfoSectionProps {
  id: number;
  title: string;
  tags: string[];
}

export function ProjectInfoSection({ title, tags }: ProjectInfoSectionProps) {
  return (
    <Container>
      <Title>{title}</Title>

      <TagContainer>
        {tags.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </TagContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  gap: 4px;
`;

const Title = styled.div`
  width: 100%;
  height: 18px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

const TagContainer = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  gap: 7px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;
