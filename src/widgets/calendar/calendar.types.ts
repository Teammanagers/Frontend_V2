import { FetchEventResponse } from '@/entities/calendar/calendar.types';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type EventEditorMode = 'register' | 'edit' | 'read';

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
}

export type { Value, EventEditorMode, IEventList, IEventSummaryPopoverProps };
