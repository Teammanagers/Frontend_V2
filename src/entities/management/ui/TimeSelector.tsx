import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  TimeSlot,
  TimeSelectorProps,
} from '@/entities/management/management.types';
import AddIcon from '@/shared/assets/common/plus.svg?react';

const generateTimeOptions = (): string[] => {
  const opts: string[] = [];
  for (let i = 0; i < 48; i++) {
    const h = String(Math.floor(i / 2)).padStart(2, '0');
    const m = i % 2 ? '30' : '00';
    opts.push(`${h}:${m}`);
  }
  return opts;
};

export const TimeSelector = ({
  day,
  times: initialTimes,
  onChange,
}: TimeSelectorProps) => {
  const [times, setTimes] = useState<TimeSlot[]>(initialTimes);
  const options = generateTimeOptions();

  useEffect(() => {
    setTimes(initialTimes);
  }, [initialTimes]);

  const handleAdd = () => {
    if (times.length < 3) {
      const next = [...times, { start: '00:00', end: '00:00' }];
      setTimes(next);
      onChange(day, next);
    }
  };

  const handleChange = (idx: number, field: 'start' | 'end', val: string) => {
    const next = times.map((t, i) => (i === idx ? { ...t, [field]: val } : t));
    setTimes(next);
    onChange(day, next);
  };

  return (
    <Row>
      <Day>{day}</Day>
      <Slots>
        {times.map((t, i) => (
          <Slot key={i}>
            <Select
              value={t.start}
              onChange={(e) => handleChange(i, 'start', e.target.value)}
            >
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </Select>
            <Dash>~</Dash>
            <Select
              value={t.end}
              onChange={(e) => handleChange(i, 'end', e.target.value)}
            >
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </Select>
          </Slot>
        ))}
        {times.length < 3 && (
          <AddBtn onClick={handleAdd}>
            <AddIcon stroke="#5C9EFF" strokeWidth={1} />
          </AddBtn>
        )}
      </Slots>
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  gap: 16px;
`;

const Day = styled.p`
  width: 70px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;

const Slots = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Slot = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Select = styled.select`
  width: 70px;
  height: 28px;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 3px;
`;

const Dash = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
`;

const AddBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 3px;
  cursor: pointer;
`;
