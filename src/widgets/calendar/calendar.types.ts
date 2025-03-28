import { IModal } from '@/shared/types';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type EventEditorMode = 'register' | 'edit' | 'read';

interface IEventEditorModalProps extends Omit<IModal, 'children'> {
  mode?: EventEditorMode;
  setModalMode: React.Dispatch<React.SetStateAction<EventEditorMode>>;
}

export type { Value, EventEditorMode, IEventEditorModalProps };
