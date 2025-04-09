import styled from 'styled-components';
import AddMemoIcon from '@/shared/assets/common/add-tag.svg?react';

export const AddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <MemoContainer onClick={onClick}>
      <AddMemoIcon width={46} height={46} stroke="#1d1d1d" />
      <MemoText>추가하기</MemoText>
    </MemoContainer>
  );
};

const MemoContainer = styled.button`
  width: 352px;
  height: 200px;
  border: none;
  background: white;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
`;

const MemoText = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
`;
