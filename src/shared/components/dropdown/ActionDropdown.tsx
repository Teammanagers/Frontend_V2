import styled from 'styled-components';
import DropdownMenuIcon from '@/shared/assets/common/dropdown-menu.svg?react';
import Dropdown from './plate/Dropdown';
import { IActionDropdownProps } from '@/shared/types';

/**
 * ActionDropdown 컴포넌트는 수정 및 삭제 버튼을 포함한 드롭다운 메뉴를 렌더링합니다.
 * 투두, 메모 등에 사용됩니다.
 *
 * @param {boolean} isOpen - 드롭다운 메뉴의 열림 상태.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen - 드롭다운 메뉴의 열림/닫힌 상태를 설정하는 함수.
 * @param {() => void} toggle - 드롭다운 메뉴의 열림/닫힘 상태를 토글하는 함수.
 * @param {() => void} action - 드롭다운 메뉴의 항목을 클릭했을 때의 액션을 핸들링하는 함수.
 * @param {string[]} menus - 드롭다운 메뉴의 항목.
 * @returns
 *
 * @example
 *
 * ```tsx
 *
 *   const { isOpen, setIsOpen, toggle } = useToggle();
 *
 *  const handleMenuAction = (menu:string) => {
 *
 *  // 메뉴에 따른 로직 추가
 *   if (menu === '수정') {
 *  // 수정 로직
 *  }
 *   toggle(); // 드롭다운 닫기
 *
 *  }
 *
 * <ActionDropdown
 *   isOpen={isOpen}
 *   setIsOpen={setIsOpen}
 *   toggle={toggle}
 *   action={handleMenuAction}
 *   menus={['수정', '삭제']}
 * />
 * ```
 */

function ActionDropdown({
  isOpen,
  setIsOpen,
  toggle,
  action,
  menus,
}: IActionDropdownProps) {
  return (
    <Dropdown setIsOpen={setIsOpen}>
      <Dropdown.Trigger onClick={toggle}>
        <DropdownMenuIcon />
      </Dropdown.Trigger>

      <Dropdown.Menu isOpen={isOpen} top="10px" left="-50%">
        <MenuWrapper>
          {menus.map((menu, index) => (
            <MenuItem
              key={index}
              $isDeleteMenu={menu === '삭제'}
              onClick={() => action(menu)}
            >
              {menu}
            </MenuItem>
          ))}
        </MenuWrapper>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export { ActionDropdown };

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55px;
  min-height: 50px;
  border-radius: 3px;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.button<{ $isDeleteMenu?: boolean }>`
  width: 100%;
  height: 25px;
  font-size: 10px;
  font-weight: 400;
  color: ${({ $isDeleteMenu }) => ($isDeleteMenu ? '#ff0000' : '#1d1d1d')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;
