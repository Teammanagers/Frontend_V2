import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CalendarEvent } from '@/entities/calendar/calendar.types';
import { useEditorModalViewModel } from '@/features/calendar/model';
import useEventQueries from '@/features/calendar/model/useEventQueries';
import DeleteIcon from '@/shared/assets/common/delete.svg?react';
import { Button } from '@/shared/components/button/Button';
import Modal from '@/shared/components/modal/Modal';
import { inputChangeHandler } from '@/shared/lib/utils/inputChangeHandler';

function EventEditorModal({ date }: { date: Date }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    useCreateEventMutation,
    useEditEventMutation,
    useDeleteEventMutation,
  } = useEventQueries(dayjs(date).format('YYYY-MM'));
  const createEventMutation = useCreateEventMutation();
  const editEventMutation = useEditEventMutation();
  const deleteEventMutation = useDeleteEventMutation();

  const {
    selectedEvent,
    isModalOpen,
    toggleModal,
    modalMode,
    setModalMode,
    inputValue,
    setInputValue,
    handleSubmitEvent,
    isValid,
  } = useEditorModalViewModel(date);

  // 모달 마운트 시 인풋 포커스
  useEffect(() => {
    if (isModalOpen && (modalMode === 'register' || modalMode === 'edit')) {
      inputRef.current?.focus();
    }
  }, [isModalOpen, modalMode]);

  return (
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
      <ModalWrapper>
        <DeleteIconWrapper onClick={toggleModal}>
          <DeleteIcon stroke="#5A5A5A" strokeWidth={2} />
        </DeleteIconWrapper>

        {/* 날짜 */}
        <Date>{dayjs(date).format('YYYY-MM-DD')}</Date>

        <Line />

        {/* 일정 제목 */}
        {modalMode === 'read' && <Title>{selectedEvent?.planDto.title}</Title>}
        {(modalMode === 'register' || modalMode === 'edit') && (
          <TitleInput
            ref={inputRef}
            name="title"
            value={inputValue.title}
            placeholder="일정 제목"
            maxLength={30}
            onChange={(e) =>
              inputChangeHandler<CalendarEvent>({ e, setInputValue })
            }
          />
        )}

        <Line />

        {/* 일정 내용 */}
        {modalMode === 'read' && (
          <Content>{selectedEvent?.planDto.content}</Content>
        )}
        {(modalMode === 'register' || modalMode === 'edit') && (
          <ContentTextarea
            name="content"
            value={inputValue.content}
            placeholder="메모"
            maxLength={100}
            onChange={(e) =>
              inputChangeHandler<CalendarEvent>({ e, setInputValue })
            }
          />
        )}

        {/* 일정 추가 버튼 */}
        {modalMode === 'register' && (
          <Button
            size="medium"
            style="main"
            onClick={() =>
              handleSubmitEvent(
                'register',
                {
                  createEvent: createEventMutation.mutate,
                  editEvent: editEventMutation.mutate,
                  deleteEvent: deleteEventMutation.mutate,
                },
                inputValue,
              )
            }
            disabled={!isValid}
          >
            일정 추가하기
          </Button>
        )}

        {/* 일정 수정, 삭제 버튼 */}
        <ButtonWrapper>
          {modalMode === 'edit' && (
            <>
              <Button
                size="small"
                style="red"
                onClick={() =>
                  handleSubmitEvent(
                    'delete',
                    {
                      createEvent: createEventMutation.mutate,
                      editEvent: editEventMutation.mutate,
                      deleteEvent: deleteEventMutation.mutate,
                    },
                    inputValue,
                  )
                }
              >
                삭제하기
              </Button>
              <Button
                size="small"
                style="main"
                disabled={!isValid}
                onClick={() =>
                  handleSubmitEvent(
                    'edit',
                    {
                      createEvent: createEventMutation.mutate,
                      editEvent: editEventMutation.mutate,
                      deleteEvent: deleteEventMutation.mutate,
                    },
                    inputValue,
                  )
                }
              >
                저장하기
              </Button>
            </>
          )}

          {modalMode === 'read' && (
            <EditButton onClick={() => setModalMode('edit')}>
              수정하기
            </EditButton>
          )}
        </ButtonWrapper>
      </ModalWrapper>
    </Modal>
  );
}

export { EventEditorModal };

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
  white-space: pre-wrap; /* 개행, 공백 유지 */
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
  width: 100%;
`;

const EditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;
