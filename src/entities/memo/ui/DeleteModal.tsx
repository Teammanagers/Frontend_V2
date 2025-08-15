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
  parentId,
  onAfterDelete,
}: DeleteModalProps) => {
  const { useDeleteFolderMutation, useDeleteMemoMutation } = useMemoMutations();
  const { mutate: deleteFolder } = useDeleteFolderMutation(parentId);
  const { mutate: deleteMemo } = useDeleteMemoMutation();

  const handleDelete = () => {
    if (type === 'folder') {
      deleteFolder(id);
    } else {
      deleteMemo(id, {
        onSuccess: () => {
          onAfterDelete?.();
          toggle();
        },
      });
    }
    toggle();
  };

  const displayName = name.length > 10 ? `${name.slice(0, 10)}...` : name;

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalContainer>
        {`'${displayName}' ${type === 'folder' ? '폴더' : '메모'}를 삭제하시겠습니까?`}
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
  min-width: 300px;
  min-height: 148px;
  padding: 32px 36px;
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
