import { Button } from '@/shared/components/button/Button';
import useToggle from '@/shared/hooks/action/useToggle';
import styled from 'styled-components';
import EventEditorModal from './EventEditorModal';
import { useState } from 'react';
import { EventEditorMode } from './calendar.types';

export default function EventCalendar() {
  const [modalMode, setModalMode] = useState<EventEditorMode>('register');
  const { isOpen, toggle } = useToggle();

  return (
    <>
      <Container>
        <Button size="mini" style="main" onClick={toggle}>
          Trigger button
        </Button>
      </Container>

      <EventEditorModal
        mode={modalMode}
        setModalMode={setModalMode}
        isOpen={isOpen}
        toggle={toggle}
      />
    </>
  );
}

const Container = styled.div`
  min-width: 632px;
  height: 544px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;
