import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFolderPathStore } from '@/features/memo/model/folderStore';
import Arrow from '@/shared/assets/memo/path-arrow.svg?react';

export const BreadCrumb = () => {
  const { path, setPath } = useFolderPathStore();
  const navigate = useNavigate();

  const handleClick = (index: number) => {
    const selected = path[index];
    navigate(`/memo/${selected.id}`);
    setPath(path.slice(0, index + 1));
  };

  return (
    <BreadCrumbContainer>
      {path.map((folder, index) => (
        <span key={folder.id} style={{ display: 'flex', alignItems: 'center' }}>
          {index !== 0 && <Arrow style={{ marginRight: '8px' }} />}
          <CrumbButton
            onClick={() => handleClick(index)}
            selected={index === path.length - 1}
          >
            {folder.name}
          </CrumbButton>
        </span>
      ))}
    </BreadCrumbContainer>
  );
};

const BreadCrumbContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  gap: 8px;
`;

const CrumbButton = styled.button<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 8px 24px;
  border-radius: 100px;
  background: white;
  font-size: 16px;
  cursor: pointer;
  ${({ selected, theme }) =>
    selected
      ? `
        border: 2px solid ${theme.colors.mainBlue};
        color: ${theme.colors.mainBlue};
        font-weight: 700;
      `
      : `
        border: 1px solid ${theme.colors.subBlue};
        color: ${theme.colors.subBlue};
        font-weight: 500;
      `}
`;
