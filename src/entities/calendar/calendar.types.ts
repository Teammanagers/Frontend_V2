// 이벤트 Date 타입
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// 이벤트 타입
interface CalendarEvent {
  date: string;
  title: string;
  content: string;
}

// 이벤트 조회 타입
type PlanDTO = CalendarEvent & {
  id: number;
  teamId: number;
  completed: boolean;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  useYn: string;
};

// 이벤트 API 반환 타입
type FetchEventResponse = {
  planDto: PlanDTO;
};

export type { Value, CalendarEvent, FetchEventResponse };
