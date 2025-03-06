import styled from 'styled-components';
import { Dropdown } from '@/shared/components/dropdown/compound/Dropdown';
import useToggle from '@/shared/components/dropdown/hooks/useToggle';
import dropdownIcon from '@/shared/assets/icons/dropdown.svg';

function ActionDropdown() {
  const { isOpen, setIsOpen, toggle } = useToggle();

  return (
    <Dropdown setIsOpen={setIsOpen}>
      <Dropdown.Trigger onClick={toggle}>
        <img src={dropdownIcon} />
      </Dropdown.Trigger>

      <Dropdown.Menu isOpen={isOpen} top="10px" left="-50%">
        <MenuWrapper>
          <ModifyButton onClick={toggle}>수정</ModifyButton>
          <DeleteButton onClick={toggle}>삭제</DeleteButton>
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
  gap: 8px;
  width: 55px;
  height: 50px;
  border-radius: 3px;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.1);

  button {
    width: 19px;
    height: 15px;
    font-size: 10px;
    font-weight: 400;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }
`;

const MenuItem = styled.button`
  font-size: 10px;
  font-weight: 400;
`;

const ModifyButton = styled(MenuItem)`
  color: #1d1d1d;
`;

const DeleteButton = styled(MenuItem)`
  color: #ff0000;
`;
