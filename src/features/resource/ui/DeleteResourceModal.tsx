import styled from 'styled-components';
import Modal from '@/shared/components/modal/Modal';
import { IModal } from '@/shared/types';
import { Button } from '@/shared/components/button/Button';

interface IDeleteResourceModalProps extends Omit<IModal, 'children'> {}

export default function DeleteResourceModal({
  isOpen,
  toggle,
}: IDeleteResourceModalProps) {
  const handleCancel = () => {
    toggle();
  };

  const handleDelete = () => {
    // 삭제 로직 구현
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalWrapper>
        <Title>자료를 삭제하시겠습니까?</Title>

        <ButtonWrapper>
          <Button size="mini" style="main" onClick={handleCancel}>
            유지
          </Button>
          <Button size="mini" style="red" onClick={handleDelete}>
            삭제
          </Button>
        </ButtonWrapper>
      </ModalWrapper>
    </Modal>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 300px;
  height: 148px;
  border-radius: 8px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.strong`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`;
