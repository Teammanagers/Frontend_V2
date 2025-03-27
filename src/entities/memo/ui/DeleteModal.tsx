import styled from 'styled-components';
import { DeleteModalProps } from '@/entities/memo/memo.type.ts';
import { Button } from '@/shared/components/button/Button.tsx';

export const DeleteModal = ({ type, title }: DeleteModalProps) => {
  return (
    <ModalContainer>
      {`'${title}' ${type === 'folder' ? '폴더' : '메모'}를 삭제하시겠습니까?`}
      <ButtonContainer>
        <Button size="mini" style="main">
          유지
        </Button>
        <Button size="mini" style="red">
          삭제
        </Button>
      </ButtonContainer>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 148px;
  border-radius: 8px;
  font-size: 16px;
  gap: 24px;
  color: ${({ theme }) => theme.colors.black};
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;
