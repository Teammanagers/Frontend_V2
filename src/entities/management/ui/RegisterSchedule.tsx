import styled from 'styled-components';
import { TimeSlot, Weekday } from '@/entities/management/management.types.ts';
import { TimeSelector } from '@/entities/management/ui/TimeSelector.tsx';
import Reset from '@/shared/assets/management/reset.svg?react';
import Submit from '@/shared/assets/management/submit.svg?react';
import { Button } from '@/shared/components/button/Button.tsx';

interface RegisterScheduleProps {
  weeklyTimes: Record<Weekday, TimeSlot[]>;
  onTimeChange: (day: Weekday, times: TimeSlot[]) => void;
  onReset: () => void;
  onSubmit: () => void;
}

export const RegisterSchedule = ({
  weeklyTimes,
  onTimeChange,
  onReset,
  onSubmit,
}: RegisterScheduleProps) => {
  const days: Weekday[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <Container>
      <AddScheduleContainer>
        {days.map((day) => (
          <TimeSelector
            key={day}
            day={day}
            times={weeklyTimes[day]}
            onChange={onTimeChange}
          />
        ))}
      </AddScheduleContainer>
      <ButtonContainer>
        <Button size="mini" style="sub" onClick={onReset} icon={<Reset />}>
          초기화
        </Button>
        <Button size="mini" style="main" onClick={onSubmit} icon={<Submit />}>
          등록
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  gap: 8px;
  background: white;
`;

const AddScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  margin: 12px 0 0 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 19px;
  gap: 10px;
`;
