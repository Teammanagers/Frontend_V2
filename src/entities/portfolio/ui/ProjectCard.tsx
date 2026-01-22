import styled from 'styled-components';
import ArrowIcon from '@/shared/assets/common/arrow.svg?react';

interface ProjectCardProps {
  id: number;
  name: string;
  duration: string;
  selected: boolean;
  onSelect: (id: number) => void;
}

export function ProjectCard({
  id,
  name,
  duration,
  selected,
  onSelect,
}: ProjectCardProps) {
  return (
    <CardContainer $selected={selected} onClick={() => onSelect(id)}>
      <ProjectName>
        <Name $selected={selected}>{name}</Name>
        <Duration>{duration}</Duration>
      </ProjectName>
      <ArrowWrapper>
        <ArrowIcon
          width={24}
          height={24}
          stroke="1d1d1d"
          strokeWidth={selected ? 2 : 1.5}
        />
      </ArrowWrapper>
    </CardContainer>
  );
}

const CardContainer = styled.div<{ $selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 487px;
  height: 64px;
  border-radius: 7px;
  border: 1px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.mainBlue : theme.colors.lightGray};
  padding: 0 16px;
  cursor: pointer;

  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.background : 'white'};
`;

const ProjectName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Name = styled.p<{ $selected: boolean }>`
  font-size: 16px;
  font-weight: ${({ $selected }) => ($selected ? 700 : 500)};
  color: ${({ theme }) => theme.colors.black};
`;

const Duration = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray};
`;

const ArrowWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
