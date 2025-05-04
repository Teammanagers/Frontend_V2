import Modal from '@/shared/components/modal/Modal';
import styled from 'styled-components';
import DeleteIcon from '@/shared/assets/common/delete.svg?react';
import { Button } from '@/shared/components/button/Button';
import { IEventEditorModalProps } from '../calendar.types';
import { useState, useEffect } from 'react';
import { Event } from '@/entities/calendar/calendar.types';
import dayjs from 'dayjs';
import { inputChangeHandler } from '@/shared/lib/utils/inputChangeHandler';
import useEventQueries from '@/entities/calendar/model/useEventQueries';

export default function EventEditorModal({
  date,
  selectedEvent,
  mode = 'register',
  isOpen,
  toggle,
  setModalMode,
}: IEventEditorModalProps) {
  const formattedDate = dayjs(date).format('YYYY-MM-DD');

  const {
    useCreateEventMutation,
    useEditEventMutation,
    useCompleteEventMutation,
    useDeleteEventMutation,
  } = useEventQueries(dayjs(date).format('YYYY-MM'));
  const createEventMutation = useCreateEventMutation();
  const editEventMutation = useEditEventMutation();
  const completeEventMutation = useCompleteEventMutation();
  const deleteEventMutation = useDeleteEventMutation();

  const [inputValue, setInputValue] = useState<Event>({
    date: formattedDate,
    title: '',
    content: '',
  });

  // EventSummaryPopover와 selectedEvent 데이터 동기화
  useEffect(() => {
    if (mode === 'edit' && selectedEvent) {
      setInputValue({
        date: formattedDate,
        title: selectedEvent.planDto.title,
        content: selectedEvent.planDto.content,
      });
    } else if (mode === 'register') {
      setInputValue({
        date: formattedDate,
        title: '',
        content: '',
      });
    }
  }, [mode, selectedEvent]);

  // 일정 추가, 수정, 삭제, 완료 API 호출
  const handleSubmitEvent = (
    mode: 'register' | 'edit' | 'delete' | 'complete',
  ) => {
    if (mode === 'register') {
      createEventMutation.mutate(inputValue);
    } else if (mode === 'edit') {
      editEventMutation.mutate({
        data: {
          planId: selectedEvent!.planDto.id,
          title: inputValue.title,
          content: inputValue.content,
        },
        planId: String(selectedEvent!.planDto.id),
      });
    } else if (mode === 'delete') {
      deleteEventMutation.mutate({
        data: {
          planId: selectedEvent!.planDto.id,
          title: inputValue.title,
          content: inputValue.content,
        },
        planId: String(selectedEvent!.planDto.id),
      });
    } else if (mode === 'complete') {
      completeEventMutation.mutate(String(selectedEvent!.planDto.id));
    }

    // inputValue 초기화
    setInputValue({
      date: formattedDate,
      title: '',
      content: '',
    });
    toggle();
  };

  // 모달이 닫힐 때 inputValue 초기화
  useEffect(() => {
    if (!isOpen)
      setInputValue({
        date: formattedDate,
        title: '',
        content: '',
      });
  }, [isOpen]);

  // 일정 추가하기 버튼 활성화 여부 (일정 제목, 내용이 비어있지 않은 경우)
  const isValid =
    inputValue.title.trim() !== '' && inputValue.content.trim() !== '';

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
        {mode === 'read' && <Title>{selectedEvent?.planDto.title}</Title>}
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
        {mode === 'read' && <Content>{selectedEvent?.planDto.content}</Content>}
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
          <Button
            size="medium"
            style="main"
            onClick={() => handleSubmitEvent('register')}
            disabled={!isValid}
          >
            일정 추가하기
          </Button>
        )}
        {/* 일정 수정,삭제 버튼 */}
        <ButtonWrapper>
          {mode === 'edit' && (
            <>
              <Button
                size="small"
                style="red"
                onClick={() => handleSubmitEvent('delete')}
              >
                삭제하기
              </Button>
              <Button
                size="small"
                style="main"
                disabled={!isValid}
                onClick={() => handleSubmitEvent('edit')}
              >
                저장하기
              </Button>
            </>
          )}

          {mode === 'read' && !selectedEvent!.planDto.completed ? (
            <>
              <Button
                size="small"
                style="sub"
                onClick={() => setModalMode('edit')}
              >
                수정하기
              </Button>
              <Button
                size="small"
                style="main"
                onClick={() => handleSubmitEvent('complete')}
              >
                일정 완료하기
              </Button>
            </>
          ) : null}
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
  flex: 1;
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
