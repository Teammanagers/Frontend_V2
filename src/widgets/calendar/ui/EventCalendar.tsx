import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import { Value } from '@/entities/calendar/calendar.types';

interface IEventCalendarProps {
  calendarHeight: string;
  updateMonth: (activeStartDate: Date | null) => void;
  handleDateChange: (newDate: Value) => void;
  handleTileContent: (props: {
    date: Date;
    view: string;
  }) => JSX.Element | null;
}

export default function EventCalendar({
  calendarHeight,
  updateMonth,
  handleDateChange,
  handleTileContent,
}: IEventCalendarProps) {
  // 캘린더 UI 및 날짜 관련 로직

  return (
    <>
      <StyledCalendarContainer $height={calendarHeight}>
        <StyledCalendar
          locale="en-US"
          calendarType="gregory" // 일요일 부터 시작
          onChange={handleDateChange}
          // MM일 제거 -> 숫자만 보이게
          formatDay={(_locale: string | undefined, date: Date) =>
            dayjs(date).format('D')
          }
          // 네비게이션에서 2023. 12 이렇게 보이도록 설정
          formatMonthYear={(_locale: string | undefined, date: Date) =>
            dayjs(date).format('YYYY. MM')
          }
          // 팝오버 렌더링 및 일정 있는 날짜에 점 UI 추가
          tileContent={handleTileContent}
          // 달 넘어갈 때 콜백함수 실행 -> 자동 선택된 값(1일)으로 캘린더 height 변화
          onActiveStartDateChange={({ activeStartDate }) =>
            updateMonth(activeStartDate)
          }
          showNeighboringMonth={true} // 전달, 다음달 날짜 숨기기
          next2Label={null} // 년도 이동 버튼 숨기기
          prev2Label={null} // 년도 이동 버튼 숨기기
          // nextLabel={<NextBtn />}
          // prevLabel={<PrevBtn />}
          minDetail="year" // 10년단위 년도 숨기기
        />
      </StyledCalendarContainer>
    </>
  );
}

const StyledCalendarContainer = styled.div<{ $height: string }>`
  width: 632px;

  .react-calendar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: inherit;
    height: ${({ $height }) => $height};
    padding: 24px 47px;
    border-radius: 10px;
    border: 1px solid rgba(221, 235, 255, 1);

    background-color: rgba(255, 255, 255, 1);
    transition: height 300ms;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      font-family: 'Roboto', sans-serif;
      color: ${({ theme }) => theme.colors.black};
    }
  }

  /* 년/월 네비게이션 */
  .react-calendar__navigation {
    display: flex;
    gap: 28px;
    align-items: center;
    width: 213px;
    height: 28px;
    margin-bottom: 18px;

    button {
      color: ${({ theme }) => theme.colors.black}; // 글자 색
      background: none;
    }

    .react-calendar__navigation__label {
      pointer-events: none; // 입력 이벤트 무시
    }

    // 년/월 타이틀
    .react-calendar__navigation__label > span {
      width: 110px;
      height: 28px;
      flex-grow: 0 !important;
      font-size: 20px;
      font-weight: 700;
      pointer-events: none; // 입력 이벤트 무시
    }

    // 이전/다음 달 버튼
    .react-calendar__navigation__prev-button,
    .react-calendar__navigation__next-button {
      width: 24px;
      height: 24px;
      padding: 0;
    }

    /* 기본 hover 효과 무시 */
    .react-calendar__navigation__prev-button:hover,
    .react-calendar__navigation__next-button:hover,
    .react-calendar__navigation__prev-button:focus,
    .react-calendar__navigation__next-button:focus,
    .react-calendar__navigation__label:hover {
      background-color: rgba(255, 255, 255, 1);
    }
  }

  /* 전체 날짜 */
  .react-calendar__month-view {
    width: 535px;
    height: 424px;

    /* 요일  */
    .react-calendar__month-view__weekdays {
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 18px;
      text-transform: capitalize;
    }

    .react-calendar__month-view__weekdays__weekday abbr {
      text-decoration: none;
      font-size: 18px;
      color: #1d1d1d;
      font-weight: 500;
    }

    /* 요일, 날짜 크기 및 정렬 */
    .react-calendar__month-view__weekdays > div,
    .react-calendar__month-view__days > button {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 60px;
      height: 60px;
      padding: 0;
    }

    /* 날짜 */
    .react-calendar__month-view__days {
      display: flex;
      justify-content: center;
      align-items: center;
      row-gap: 12px;
      column-gap: 18px;
    }

    .react-calendar__month-view__days__day {
      position: relative;
    }

    .react-calendar__month-view__days__day abbr {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 26px;
      height: 26px;
      font-size: 18px;
      font-weight: 400;
    }

    /* 요일, 날짜 폰트 */
    .react-calendar__month-view__weekdays__weekday abbr,
    .react-calendar__month-view__days abbr {
      font-size: 18px;
      font-weight: 400;
    }

    // 팝오버 보이도록 설정
    .react-calendar__tile {
      overflow: visible !important;
    }
    /* 기본 hover 효과 제거 */
    .react-calendar__tile:hover {
      background-color: rgba(255, 255, 255, 1);
    }

    .react-calendar__month-view__days__day:hover abbr {
      font-weight: 500;
    }

    /* 오늘 날짜 */
    .react-calendar__tile--now {
      background-color: rgba(255, 255, 255, 1);
    }
    .react-calendar__tile--now abbr {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: rgba(221, 235, 255, 1);
    }

    /* 선택된 날짜 */
    .react-calendar__tile--active abbr {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.mainBlue};
      color: ${({ theme }) => theme.colors.white};
      font-weight: 500;
      transition: background-color 400ms ease-in;
    }

    /* 이전/다음 달 날짜 */
    .react-calendar__month-view__days__day--neighboringMonth abbr {
      color: rgba(204, 204, 204, 1);
    }
  }
`;

const StyledCalendar = styled(Calendar)``;
