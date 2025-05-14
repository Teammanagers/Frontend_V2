import styled from 'styled-components';
import { ShowScheduleProps } from '@/entities/management/management.types.ts';
import { convertTimeTableToTimeSlots } from '../lib/timeSlots';

export const ShowSchedule = ({ schedule }: ShowScheduleProps) => {
  return (
    <ScheduleContainer>
      {Object.entries(schedule).map(([day, timeTable]) => (
        <DayContainer key={day}>
          <DayText>{day.charAt(0).toUpperCase() + day.slice(1)}</DayText>
          {convertTimeTableToTimeSlots(timeTable.value).length > 0 ? (
            convertTimeTableToTimeSlots(timeTable.value).map((slot, index) => (
              <TimeContainer key={index}>
                <TimeBox>{slot.start}</TimeBox>
                <SwungDash>~</SwungDash>
                <TimeBox>{slot.end}</TimeBox>
              </TimeContainer>
            ))
          ) : (
            <TimeContainer>가능한 시간대가 없어요 😥</TimeContainer>
          )}
        </DayContainer>
      ))}
    </ScheduleContainer>
  );
};

const ScheduleContainer = styled.div`
  width: 100%;
  height: 281px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  background: white;
`;

const DayContainer = styled.div`
  width: 100%;
  height: 31px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 20px;
`;

const DayText = styled.p`
  width: 80px;
  font-size: 14px;
  font-weight: 500;
  margin-right: 7px;
  color: ${({ theme }) => theme.colors.black};
`;

const TimeContainer = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.black};
`;

const SwungDash = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
`;

const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 28px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background: white;
`;
