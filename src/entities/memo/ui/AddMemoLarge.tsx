import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AddMemo from '@/entities/memo/assets/add-memo.svg';
import Plus from '@/entities/memo/assets/plus.svg';

export const AddMemoLarge = () => {
  const navigate = useNavigate();
  return (
    <MemoContainer
      onClick={() => {
        navigate(`/memo/write`);
      }}
    >
      <AddMemo />
      <MemoTextContainer>
        <MemoText>화면을 클릭하여 팀과 공유할 메모를 남길 수 있습니다</MemoText>
        <Plus />
      </MemoTextContainer>
    </MemoContainer>
  );
};

const MemoContainer = styled.button`
  width: 1088px;
  height: 632px;
  background: white;
  border-radius: 6px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

const MemoTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 18px;
`;

const MemoText = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;
