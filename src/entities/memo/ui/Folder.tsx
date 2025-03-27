import styled from 'styled-components';
import DropDown from '@/shared/assets/common/dropdown-menu.svg?react';
import FolderIcon from '@/shared/assets/memo/folder.svg?react';

export const Folder = () => {
  return (
    <FolderWrapper>
      <FolderContainer />
      <Overlay>
        <DropDownBtn />
        <FolderText>폴더명</FolderText>
      </Overlay>
    </FolderWrapper>
  );
};

const FolderWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const FolderContainer = styled(FolderIcon)`
  display: block;

  &:hover path {
    stroke: ${({ theme }) => theme.colors.subLightBlue};
    stroke-width: 2;
  }
  &:hover {
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 24px;
  width: 100%;
  height: 172px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const FolderText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;

const DropDownBtn = styled(DropDown)`
  position: absolute;
  top: 26px;
  right: 8px;
  cursor: pointer;
  pointer-events: auto;
`;
