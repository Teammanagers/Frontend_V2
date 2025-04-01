import { Value } from '../calendar.types';

// 한 달에 몇 주가 있는지 구하는 함수
const getWeeksInMonth = (date: Date) => {
  // 해당 달의 1일의 요일 (0 =일, 1 = 월, ..., 6 = 토)
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  // 해당 달의 마지막 날짜 (ex. 30, 31)
  const lastDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();

  // 	2025년 3월 → 1일이 토요일(6), 31일까지
  // → 6 + 31 = 37
  // → 37 / 7 = 5.28... → 6주
  return Math.ceil((firstDay + lastDate) / 7);
};

// 주차를 결정하는 함수
// 다양한 형태의 입력 (Date, Date 배열) 및 기본값 예외 처리
const determineWeeksInMonth = (value: Value) => {
  if (value instanceof Date) {
    return getWeeksInMonth(value);
  } else if (Array.isArray(value) && value[0] instanceof Date) {
    return getWeeksInMonth(value[0]);
  }
  // value가 Date, 배열 둘다 아닌 경우 -> 기본적으로 현재 날짜를 기준으로 계산
  else {
    return getWeeksInMonth(new Date());
  }
};

export { determineWeeksInMonth };
