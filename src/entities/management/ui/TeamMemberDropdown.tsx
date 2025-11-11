import styled from 'styled-components';
import Dropdown from '@/shared/components/dropdown/plate/Dropdown.tsx';
import { IMemberResponse } from '@/shared/types/member.types';

interface ITeamMemberDropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  members: IMemberResponse[];
  selectedMembers: IMemberResponse[];
  onAddMember: (member: IMemberResponse) => void;
}

export function TeamMemberDropdown({
  isOpen,
  setIsOpen,
  members,
  selectedMembers,
  onAddMember,
}: ITeamMemberDropdownProps) {
  return (
    <Dropdown setIsOpen={setIsOpen}>
      <Dropdown.Menu isOpen={isOpen}>
        <MenuWrapper>
          {members.map((member) => {
            const isSelected = selectedMembers.some(
              (m) => m.teamMemberId === member.teamMemberId,
            );

            return (
              <MenuItem
                key={member.teamMemberId}
                $isSelected={isSelected}
                disabled={isSelected}
                onClick={() => {
                  if (!isSelected) onAddMember(member);
                }}
              >
                {member.member.name}
              </MenuItem>
            );
          })}
        </MenuWrapper>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 76px;
  background: white;
  border-radius: 4px;
  gap: 10px;
  padding: 6px 0;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.button<{ $isSelected?: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 15px;
  text-align: left;
  font-size: 12px;
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.gray : theme.colors.black};
  background: white;
  cursor: ${({ $isSelected }) => ($isSelected ? 'not-allowed' : 'pointer')};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.gray : theme.colors.mainBlue};
  }
`;
