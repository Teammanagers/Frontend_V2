import { ReactNode } from 'react';

// 모달
interface IModal {
  children: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

// 드롭다운
interface IDropdown {
  children: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IDropdownMenu {
  children: ReactNode;
  isOpen: boolean;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

interface IDropdownTrigger {
  children: ReactNode;
  onClick: () => void;
}

interface IActionDropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  action: (menu: string) => void;
  menus: string[];
}

// 아코디언
interface IAccordion {
  title: string;
  tagList?: string[];
}

interface IAccordionProps extends IAccordion {
  children: React.ReactNode;
}
interface IAccordionHeaderProps extends IAccordion {
  isOpen: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// 스켈레톤
interface ISkeletonProps {
  width: number;
  height: number;
}

export type {
  IModal,
  IDropdown,
  IDropdownMenu,
  IDropdownTrigger,
  IActionDropdownProps,
  IAccordionProps,
  IAccordionHeaderProps,
  ISkeletonProps,
};
