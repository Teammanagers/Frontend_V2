import Modal from '@/shared/components/modal/Modal';
import styled from 'styled-components';
import DeleteIcon from '@/shared/assets/common/delete.svg?react';
import { Button } from '@/shared/components/button/Button';
import { IEventEditorModalProps } from '../calendar.types';
import { useState } from 'react';
import { Event } from '@/entities/calendar/calendar.types';
import dayjs from 'dayjs';
import { inputChangeHandler } from '@/shared/lib/utils/inputChangeHandler';
import { TEAM_ID } from '@/shared/config/constants/team.constants';
import useEventQueries from '@/entities/calendar/model/useEventQueries';

export default function EventEditorModal({
  date,
  mode = 'register',
  isOpen,
  toggle,
  setModalMode,
}: IEventEditorModalProps) {
  const formattedDate = dayjs(date).format('YYYY-MM-DD');

  const { useCreateEventMutation } = useEventQueries();
  const createEventMutation = useCreateEventMutation();

  const [inputValue, setInputValue] = useState<Event>({
    date: formattedDate,
    title: '',
    content: '',
  });

  const handleAddEvent = () => {
    createEventMutation.mutate(inputValue); // 일정 생성 API 호출
    console.log(createEventMutation.data);

    // inputValue 초기화
    setInputValue({
      date: formattedDate,
      title: '',
      content: '',
    });
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalWrapper>
        <DeleteIconWrapper onClick={toggle}>
          <DeleteIcon stroke="#5A5A5A" />
        </DeleteIconWrapper>
        {/* 날짜 */}
        <Date>{formattedDate}</Date>

        <Line />

        {/* 일정 제목 */}
        {mode === 'read' && <Title>오후 8시 회의!</Title>}
        {(mode === 'register' || mode === 'edit') && (
          <TitleInput
            name="title"
            value={inputValue.title}
            placeholder="일정 제목"
            maxLength={30}
            onChange={(e) => inputChangeHandler<Event>({ e, setInputValue })}
          />
        )}

        <Line />

        {/* 일정 내용 */}
        {mode === 'read' && <Content>디코 .....으로 오세요</Content>}
        {(mode === 'register' || mode === 'edit') && (
          <ContentTextarea
            name="content"
            value={inputValue.content}
            placeholder="메모"
            maxLength={100}
            onChange={(e) => inputChangeHandler<Event>({ e, setInputValue })}
          />
        )}

        {/* 일정 추가 버튼 */}
        {mode === 'register' && (
          <Button size="medium" style="main" onClick={handleAddEvent}>
            일정 추가하기
          </Button>
        )}
        {/* 일정 수정,삭제 버튼 */}
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
