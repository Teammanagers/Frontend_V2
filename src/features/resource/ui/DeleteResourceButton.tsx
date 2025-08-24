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
  ...props
}: IDeleteResourceButtonProps) {
  // 리소스 삭제 로직 및 모달 오픈 -> 훅으로 분리
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  if (resourceId !== myId) return null;

  return (
    <ButtonContainer {...props} onClick={handleDeleteClick}>
      <DeleteIcon width="16px" height="16px" stroke="#5a5a5a" strokeWidth={2} />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;
