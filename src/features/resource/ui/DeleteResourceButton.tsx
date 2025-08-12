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
  const handleDeleteClick = () => {
    // 리소스 삭제 로직 및 모달 오픈
  };

  return (
    <ButtonContainer {...props} onClick={handleDeleteClick}>
      <DeleteIcon width="16px" height="16px" stroke="#5a5a5a" />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;
