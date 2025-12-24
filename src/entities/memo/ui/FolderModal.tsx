import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useMemoMutations from '@/entities/memo/model/useMemoMutations.ts';
import { Button } from '@/shared/components/button/Button.tsx';
import Modal from '@/shared/components/modal/Modal.tsx';
import { ModalProps } from '@/shared/types/modal.types.ts';

interface IFolderModalProps extends ModalProps {
  mode: 'create' | 'edit';
  currentName?: string;
  folderId?: number;
  parentId: number;
}

export const FolderModal = ({
  mode,
  currentName,
  isOpen,
  toggle,
  folderId,
  parentId,
}: IFolderModalProps) => {
  const [folderName, setFolderName] = useState(
    mode === 'edit' ? (currentName ?? '') : '',
  );

  const { useCreateFolderMutation, useEditFolderMutation } = useMemoMutations();
  const { mutate: createFolder } = useCreateFolderMutation();
  const { mutate: editFolder } = useEditFolderMutation();

  const handleSubmit = () => {
    if (mode === 'create') {
      createFolder(
        {
          name: folderName,
          parentId,
        },
        {
          onSuccess: () => {
            toggle();
          },
        },
      );
    } else if (mode === 'edit' && folderId !== undefined) {
      editFolder(
        {
          name: folderName,
          folderId,
        },
        {
          onSuccess: () => toggle(),
        },
      );
    }
  };

  const buttonText = mode === 'create' ? '폴더 생성' : '폴더명 수정';
  const isDisabled = mode === 'create' && folderName.trim() === '';

  const buttonStyle = isDisabled ? 'disabled' : 'main';

  useEffect(() => {
    if (mode == 'edit') setFolderName(currentName ?? '');
    else setFolderName('');
  }, [mode, currentName]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <FolderModalContainer>
        <InputContainer>
          <InputText>폴더명</InputText>
          <FolderInput
            placeholder="폴더명을 설정해주세요"
            value={folderName}
            maxLength={30}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </InputContainer>
        <Button
          size="xl"
          style={buttonStyle}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          {buttonText}
        </Button>
      </FolderModalContainer>
    </Modal>
  );
};

const FolderModalContainer = styled.div`
  width: 552px;
  height: 201px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 40px;
  gap: 32px;

  background: white;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;

const FolderInput = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.silver};
  padding-left: 18px;
  background: white;
`;

const InputText = styled.p`
  font-size: 16px;
  font-weight: 700;
`;
