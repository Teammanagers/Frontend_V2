import { FetchEventResponse } from '@/entities/calendar/calendar.types';
import { IModal } from '@/shared/types';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type EventEditorMode = 'register' | 'edit' | 'read';

interface IEventEditorModalProps extends Omit<IModal, 'children'> {
  date: Date;
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
  date: Date;
  eventList: FetchEventResponse[];
  isModalOpen: boolean;
  isPopoverOpen: boolean;
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  setModalMode: React.Dispatch<React.SetStateAction<EventEditorMode>>;
}

export type {
  Value,
  EventEditorMode,
  IEventEditorModalProps,
  IEventList,
  IEventSummaryPopoverProps,
};
