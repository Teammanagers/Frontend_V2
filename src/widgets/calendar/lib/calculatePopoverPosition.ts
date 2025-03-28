import { POPOVER_OFFSET } from '../config/calendar.constants';

function calculatePopoverPosition(
  popover: HTMLDivElement,
  setAdjustLeft: React.Dispatch<React.SetStateAction<string>>,
) {
  const calendar = popover.closest('.react-calendar'); // class가 react-calendar인 가장 가까운 부모 요소 반환
  const rect = popover.getBoundingClientRect(); // popover의 화면상의 위치 및 크기 정보
  const calendarRect = calendar?.getBoundingClientRect(); // 달력의 위치 정보

  if (calendarRect) {
    const overflowRight = rect.right >= calendarRect.right - POPOVER_OFFSET; // popover가 달력의 오른쪽을 넘어갈 때
    const overflowLeft = rect.left - POPOVER_OFFSET <= calendarRect.left; // popover가 달력의 왼쪽을 넘어갈 때 (transform으로 왜곡된 값만큼 보정)

    if (overflowRight) {
      setAdjustLeft('-25%');
    } else if (overflowLeft) {
      setAdjustLeft('25%');
    } else {
      setAdjustLeft('0%');
    }
  }
}

export { calculatePopoverPosition };
