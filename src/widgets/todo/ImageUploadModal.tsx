import Modal from '@/shared/components/modal/Modal';
import styled from 'styled-components';
import ImageUploadIcon from '@/shared/assets/todo/image-upload.svg?react';
import { IImageUplaodModalProps } from './todo.types';

function ImageUploadModal({ isOpen, toggle }: IImageUplaodModalProps) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalWrapper>
        <UploadArea>
          <UploadImage>
            <strong>인증사진 업로드</strong>
            <IconWrapper>
              <ImageUploadIcon />
            </IconWrapper>
          </UploadImage>

          <UploadGuideText>
            해당 영억을 클릭하여 파일을 업로드하거나 사진을 끌어당겨주세요
          </UploadGuideText>
        </UploadArea>

        <SkipButton onClick={toggle}>건너뛰기</SkipButton>
      </ModalWrapper>
    </Modal>
  );
}

export { ImageUploadModal };

const FlexCenterPlate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled(FlexCenterPlate)`
  flex-direction: column;
  gap: 24px;
  width: 552px;
  height: 168px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const UploadArea = styled(FlexCenterPlate)`
  flex-direction: column;
  width: 472px;
  height: 78px;
  border-radius: 4px;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const UploadImage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled(FlexCenterPlate)``;

const UploadGuideText = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;

const SkipButton = styled.button`
  width: 45px;
  height: 18px;
  font-size: 12px;
  font-weight: 500;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.darkGray};
  cursor: pointer;
`;
