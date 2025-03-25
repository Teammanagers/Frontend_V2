import { IModal } from '@/shared/types';

type EventEditorMode = 'register' | 'edit' | 'read';

interface IEventEditorModalProps extends Omit<IModal, 'children'> {
  mode?: EventEditorMode;
  setModalMode: React.Dispatch<React.SetStateAction<EventEditorMode>>;
}

export type { EventEditorMode, IEventEditorModalProps };
