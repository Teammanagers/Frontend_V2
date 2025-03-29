import { IModal } from '@/shared/types';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type EventEditorMode = 'register' | 'edit' | 'read';

interface IEventEditorModalProps extends Omit<IModal, 'children'> {
  mode?: EventEditorMode;
  setModalMode: React.Dispatch<React.SetStateAction<EventEditorMode>>;
}

interface IEventList {
  calendarId: number;
  title: string;
  status: string;
  isAlarm: boolean;
  date: string;
}

interface IEventSummaryPopoverProps {
  eventList: IEventList[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type {
  Value,
  EventEditorMode,
  IEventEditorModalProps,
  IEventList,
  IEventSummaryPopoverProps,
};
