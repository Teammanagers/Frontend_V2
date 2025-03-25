import Modal from '@/shared/components/modal/Modal';
import { IEventEditorModalProps } from './calendar.types';
import styled from 'styled-components';
import DeleteIcon from '@/shared/assets/common/delete.svg?react';
import { Button } from '@/shared/components/button/Button';

export default function EventEditorModal({
  mode = 'register',
  isOpen,
  toggle,
  setModalMode,
}: IEventEditorModalProps) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalWrapper>
        <DeleteIconWrapper onClick={toggle}>
          <DeleteIcon stroke="#5A5A5A" />
        </DeleteIconWrapper>
        {/* 날짜 */}
        <Date>2024.07.17</Date>

        <Line />

        {/* 일정 제목 */}
        {mode === 'read' && <Title>오후 8시 회의!</Title>}
        {(mode === 'register' || mode === 'edit') && (
          <TitleInput placeholder="일정 제목" maxLength={30} />
        )}

        <Line />

        {/* 일정 내용 */}
        {mode === 'read' && <Content>디코 .....으로 오세요</Content>}
        {(mode === 'register' || mode === 'edit') && (
          <ContentTextarea placeholder="메모" maxLength={100} />
        )}

        {/* 버튼 */}
        {mode === 'register' && (
          <Button size="medium" style="main" onClick={toggle}>
            일정 추가하기
          </Button>
        )}
        <ButtonWrapper>
          {mode === 'edit' && (
            <>
              <Button size="small" style="red" onClick={toggle}>
                삭제하기
              </Button>
              <Button size="small" style="main" onClick={toggle}>
                저장하기
              </Button>
            </>
          )}
          {mode === 'read' && (
            <>
              <Button
                size="small"
                style="sub"
                onClick={() => setModalMode('edit')}
              >
                수정하기
              </Button>
              <Button size="small" style="main" onClick={toggle}>
                일정 완료하기
              </Button>
            </>
          )}
        </ButtonWrapper>
      </ModalWrapper>
    </Modal>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 350px;
  height: 280px;
  padding: 14px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const DeleteIconWrapper = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 24px;
  margin-bottom: 2px;
  cursor: pointer;
`;

const Line = styled.span`
  display: block;
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const Date = styled.span`
  width: 100%;
  height: 15px;
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;

const TitleInput = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const Content = styled.p`
  width: 100%;
  height: 123px;
  padding-top: 10px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  height: 123px;
  padding-top: 10px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
`;
