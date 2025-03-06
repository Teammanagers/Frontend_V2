import { ReactNode, useRef } from 'react';
import styled from 'styled-components';
import { useClickOutside } from '@/shared/components/dropdown/hooks/useClickOutstide';
import DropdownTrigger from './Trigger';
import DropdownMenu from './Menu';

interface IDropdown {
  children: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * 드롭다운 트리거 및 메뉴를 위한 컨테이너를 제공하는 드롭다운 컴포넌트입니다.
 *
 * @param {ReactNode} children - 드롭다운의 내용으로, 일반적으로 Dropdown.Trigger 및 Dropdown.Menu를 포함합니다.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen - 드롭다운의 열림 상태를 설정하는 함수입니다.
 */

const Dropdown = ({ children, setIsOpen }: IDropdown) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, setIsOpen);

  return <DropdownContainer ref={dropdownRef}>{children}</DropdownContainer>;
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;

export { Dropdown };

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;
