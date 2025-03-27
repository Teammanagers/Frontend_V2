import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FolderModalProps } from '@/entities/memo/memo.type.ts';
import { Button } from '@/shared/components/button/Button.tsx';

export const FolderModal = ({
  mode,
  currentName = '안녕',
}: FolderModalProps) => {
  const [folderName, setFolderName] = useState(
    mode === 'edit' ? (currentName ?? '') : '',
  );

  const buttonText = mode === 'create' ? '폴더 생성' : '폴더명 수정';
  const isDisabled = mode === 'create' && folderName.trim() === '';

  const buttonStyle = isDisabled ? 'disabled' : 'main';

  useEffect(() => {
    if (mode == 'edit') setFolderName(currentName);
    else setFolderName('');
  }, [mode, currentName]);

  useEffect(() => {
    console.log('style', buttonStyle);
    console.log('disabled', isDisabled);
  }, [buttonStyle, isDisabled]);

  return (
    <FolderModalContainer>
      <InputContainer>
        <InputText>폴더명</InputText>
        <FolderInput
          placeholder="폴더명을 설정해주세요"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
      </InputContainer>
      <Button size="xl" style={buttonStyle} disabled={isDisabled}>
        {buttonText}
      </Button>
    </FolderModalContainer>
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
