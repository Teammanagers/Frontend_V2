import styled from 'styled-components';

interface TagProps {
  text: string;
  variant?: 'default' | 'primary';
}

export function Tag({ text }: TagProps) {
  return (
    <TagBox>
      <TagText>{text}</TagText>
    </TagBox>
  );
}

const TagBox = styled.div`
  max-width: 80px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 8px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TagText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainBlue};
`;
