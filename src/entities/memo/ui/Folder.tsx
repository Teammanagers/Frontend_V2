import styled from 'styled-components';
import FolderIcon from '@/shared/assets/memo/folder.svg?react';
import { ActionDropdown } from '@/shared/components/dropdown';
import useToggle from '@/shared/hooks/action/useToggle.ts';
import { FolderProps } from '@/shared/types/memo.types.ts';

export const Folder = ({ folder, onDeleteRequest }: FolderProps) => {
  const { isOpen, setIsOpen, toggle } = useToggle();

  const { id, title } = folder;

  const handleMenuAction = (menu: string) => {
    if (menu === '수정') {
      console.log('폴더 수정 모달 띄우기');
      setIsOpen(true);
    } else if (menu === '삭제') {
      onDeleteRequest(id);
    }
    toggle();
  };

  return (
    <FolderWrapper>
      <FolderContainer />
      <Overlay>
        <DropDownContainer>
          <ActionDropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            toggle={toggle}
            action={handleMenuAction}
            menus={['수정', '삭제']}
          />
        </DropDownContainer>
        <FolderText>{title}</FolderText>
      </Overlay>
    </FolderWrapper>
  );
};

const FolderContainer = styled(FolderIcon)`
  display: block;
`;

const FolderWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${FolderContainer} {
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
  }

  &:hover ${FolderContainer} path {
    stroke: ${({ theme }) => theme.colors.subLightBlue};
    stroke-width: 3;
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

const DropDownContainer = styled.div`
  position: absolute;
  top: 26px;
  right: 8px;
  pointer-events: auto;
`;
