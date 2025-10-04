import styled from 'styled-components';
import { TimeSlot } from '@/entities/management/management.types.ts';
import { TimeSelector } from '@/entities/management/ui/TimeSelector.tsx';
import Reset from '@/shared/assets/management/reset.svg?react';
import Submit from '@/shared/assets/management/submit.svg?react';
import { Button } from '@/shared/components/button/Button.tsx';

type Weekday =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

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
  width: 949px;
  height: 325px;
  display: flex;
  flex-direction: column;
  margin-top: 23px;
  background: white;
`;

const AddScheduleContainer = styled.div`
  height: 336px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 11px;
  background: chartreuse;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 19px;
  gap: 10px;
  margin-top: 8px;
`;
