import styled from 'styled-components';
import DeleteIcon from '@/shared/assets/common/delete.svg?react';

interface IDeleteResourceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  resourceId: number;
  myId: number;
}

export default function DeleteResourceButton({
  resourceId,
  myId,
  onClick,
  ...props
}: IDeleteResourceButtonProps) {
  if (resourceId !== myId) return null;

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
