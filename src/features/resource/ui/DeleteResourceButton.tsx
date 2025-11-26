import styled from 'styled-components';
import DeleteIcon from '@/shared/assets/common/delete.svg?react';
import { useTeamStore } from '@/shared/model/store/teamStore';

interface IDeleteResourceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  creatorId: number;
}

export default function DeleteResourceButton({
  creatorId,
  onClick,
  ...props
}: IDeleteResourceButtonProps) {
  const myTeamMemberId = useTeamStore((state) => state.teamMemberId);

  if (creatorId !== myTeamMemberId) return null;

  return (
    <ButtonContainer {...props} onClick={onClick}>
      <DeleteIcon width="16px" height="16px" stroke="#5a5a5a" strokeWidth={2} />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;
