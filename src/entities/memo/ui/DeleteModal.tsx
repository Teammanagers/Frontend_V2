import styled from 'styled-components';
import { DeleteModalProps } from '@/entities/memo/memo.type.ts';
import { Button } from '@/shared/components/button/Button.tsx';

export const DeleteModal = ({ type, name, onClose }: DeleteModalProps) => {
  const handleDelete = () => {
    if (type === 'folder') {
      console.log('폴더 삭제 로직');
    } else if (type === 'memo') {
      console.log('메모 삭제 로직');
    }
  };
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {`'${name}' ${type === 'folder' ? '폴더' : '메모'}를 삭제하시겠습니까?`}
        <ButtonContainer>
          <Button size="mini" style="main" onClick={onClose}>
            유지
          </Button>
          <Button size="mini" style="red" onClick={handleDelete}>
            삭제
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

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
