import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MoveModalProps } from '@/entities/memo/memo.type.ts';
import useMemoMutations from '@/entities/memo/model/useMemoMutations.ts';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { ModalContainer } from '@/entities/memo/ui/AddModal.tsx';
import Modal from '@/shared/components/modal/Modal.tsx';

export const MoveModal = ({ memoId, isOpen, toggle }: MoveModalProps) => {
  const { folderId } = useParams<{ folderId: string }>();
  const { useFolderListQuery } = useMemoQueries();
  const { useMoveMemoMutation } = useMemoMutations();

  console.log('movemodal id들: ', folderId, memoId);

  const { data: folders } = useFolderListQuery(Number(folderId));
  const { mutate: moveMemo } = useMoveMemoMutation();
  const navigate = useNavigate();

  const handleMove = (targetFolderId: number) => {
    moveMemo(
      { memoId, folderId: targetFolderId },
      {
        onSuccess: () => {
          navigate(`/memo/${targetFolderId}`);
          toggle();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalContainer>
        {folders?.map((folder) => (
          <MenuContainer key={folder.id}>
            <MenuText>{folder.title}</MenuText>
            <Button onClick={() => handleMove(folder.id)}>이동</Button>
          </MenuContainer>
        ))}
      </ModalContainer>
    </Modal>
  );
};

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  gap: 12px;
  border-radius: 4px;
  background: white;
  transition: background 0.2s;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.lightGray};
  }
`;

const MenuText = styled.span`
  font-size: 16px;
`;

const Button = styled.button`
  position: absolute;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 24px;
  background: ${({ theme }) => theme.colors.mainBlue};
  border-radius: 4px;
  font-size: 9px;
  font-weight: 700;
  line-height: 24px;
  color: white;
`;
