import styled from 'styled-components';
import { DeleteModalProps } from '@/entities/memo/memo.type';
import useMemoMutations from '@/entities/memo/model/useMemoMutations.ts';
import { Button } from '@/shared/components/button/Button';
import Modal from '@/shared/components/modal/Modal.tsx';

export const DeleteModal = ({
  type,
  id,
  name,
  isOpen,
  toggle,
}: DeleteModalProps) => {
  const { useDeleteFolderMutation } = useMemoMutations();
  const { mutate: deleteFolder } = useDeleteFolderMutation(3); // 3은 현재 부모 폴더 ID

  const handleDelete = () => {
    if (type === 'folder') {
      deleteFolder(id);
    } else {
      console.log('메모 삭제 로직');
    }
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalContainer>
        {`'${name}' ${type === 'folder' ? '폴더' : '메모'}를 삭제하시겠습니까?`}
        <ButtonContainer>
          <Button size="mini" style="main" onClick={toggle}>
            유지
          </Button>
          <Button size="mini" style="red" onClick={handleDelete}>
            삭제
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
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
