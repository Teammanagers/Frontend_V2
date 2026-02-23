import MypageNoticeIcon from '@/shared/assets/mypage/loudspeaker.svg?react';
import MypagePortfolio from '@/shared/assets/mypage/portfolio.svg?react';
import MypageTermOfServiceIcon from '@/shared/assets/mypage/term-of-service.svg?react';
import MypageProfileIcon from '@/shared/assets/mypage/update-profile.svg?react';
import FixedMemoList from '@/widgets/memo/FixedMemoList';
import RecentResourceList from '@/widgets/resource/RecentResourceList';
import { MyTodoList } from '@/widgets/todo/MyTodoList';
import { UpcomingEventList } from '@/widgets/upcoming-event';

// 팀 관련 기본 경로 패턴
export const TEAM_BASE_PATH = 'team/:teamId';

// 각 주요 기능별 경로 세그먼트
// - routes.tsx 파일에서 AppRoutes 정의 시 사용됩니다
export const ROUTE_SEGMENTS = {
  LOGIN: 'login',
  REDIRECT: 'redirect',
  LOGIN_ADMIN: 'login-admin',
  SIGN_UP: 'sign-up',
  MAKE_TEAM: 'make-team',
  TEAM_JOIN: 'team-join',
  SELECT_TEAM: 'select-team',
  TODO_LIST: 'todo-list',
  CALENDAR: 'calendar',
  RESOURCE: 'resource',
  MANAGEMENT: 'management',
  MEMO: 'memo',
  MEMO_FOLDER: ':folderId',
  MEMO_DETAIL: ':folderId/:memoId',
  MEMO_WRITE: ':folderId/write',
  MEMO_EDIT: 'edit/:memoId',
  MY_PAGE: 'mypage',
  MY_PAGE_PROFILE: 'mypage/profile',
  MY_PAGE_PORTFOLIO: 'mypage/portfolio',
  NOTICE: 'notice',
  END: 'end',
} as const;

// 팀 ID를 기반으로 기본 경로를 생성하는 헬퍼 함수
// - 이 함수는 해당 파일 내부에서만 사용됩니다
const basePath = (teamId: number | string) => `/team/${teamId}`;

// 애플리케이션의 모든 경로를 정의
// - 팀 ID를 필요로 하는 경로는 함수 형태로 정의됩니다
// - 팀 ID는 전역 상태로 관리되기 때문에 useTeamNavigate 훅을 통해 사용하는 것을 권장합니다
export const PATHS = {
  MAIN: (teamId: number) => basePath(teamId),

  /* 투두리스트 */
  TODO_LIST: (teamId: number) =>
    `${basePath(teamId)}/${ROUTE_SEGMENTS.TODO_LIST}`,

  /* 캘린더 */
  CALENDAR: (teamId: number) =>
    `${basePath(teamId)}/${ROUTE_SEGMENTS.CALENDAR}`,

  /* 자료실 */
  RESOURCE: (teamId: number) =>
    `${basePath(teamId)}/${ROUTE_SEGMENTS.RESOURCE}`,

  /* 메모 */
  MEMO: (teamId: number) => `${basePath(teamId)}/${ROUTE_SEGMENTS.MEMO}`,

  /* 관리 (AppRoutes.tsx에 있어서 추가했습니다) */
  MANAGEMENT: (teamId: number) =>
    `${basePath(teamId)}/${ROUTE_SEGMENTS.MANAGEMENT}`,

  /* 마이페이지 */
  MY_PAGE: (teamId: number) => `${basePath(teamId)}/${ROUTE_SEGMENTS.MY_PAGE}`,
  PROFILE: (teamId: number) =>
    `${basePath(teamId)}/${ROUTE_SEGMENTS.MY_PAGE_PROFILE}`,
  PORTFOLIO: (teamId: number) =>
    `${basePath(teamId)}/${ROUTE_SEGMENTS.MY_PAGE_PORTFOLIO}`,

  /* 공지사항 페이지 */
  NOTICE: (teamId: number) => `${basePath(teamId)}/${ROUTE_SEGMENTS.NOTICE}`,

  /* 프로젝트 종료 페이지 */
  END: (teamId: number) => `${basePath(teamId)}/${ROUTE_SEGMENTS.END}`,

  /* 이용약관 및 개인정보처리방침 페이지 */
  TERMS_OF_SERVICE:
    'https://teammanagers.notion.site/a0e670c730424f56b4c1bfe4627f70a2?source=copy_link',
} as const;

/**
 * --- RouteConfig 관련 타입 정의 ---
 */

// 모든 경로를 타입으로 정의
export type AppPath = (typeof PATHS)[keyof typeof PATHS];

interface RouteConfig {
  label: string; // 네비게이션 링크에 표시될 텍스트
  to: AppPath | ((teamId: number) => string); // 경로
  component?: React.ComponentType; // 해당 경로에 렌더링될 컴포넌트
  props?: Record<string, unknown>;
  icon?: React.ComponentType; // 메뉴에서 렌더링 될 아이콘
}

export const mainRoutes: RouteConfig[] = [
  {
    label: '다가오는 일정',
    to: PATHS.CALENDAR,
    component: UpcomingEventList,
    props: {
      limit: 3,
      variant: 'card',
    },
  },
  { label: '투두리스트', to: PATHS.TODO_LIST, component: MyTodoList },
  {
    label: '최근 업데이트 된 자료',
    to: PATHS.RESOURCE,
    component: RecentResourceList,
  },
  { label: '고정된 메모', to: PATHS.MEMO, component: FixedMemoList },
];

export const mypageRoutes: RouteConfig[] = [
  { label: '프로필 수정', to: PATHS.PROFILE, icon: MypageProfileIcon },
  { label: '포트폴리오', to: PATHS.PORTFOLIO, icon: MypagePortfolio },
  { label: '공지사항', to: PATHS.NOTICE, icon: MypageNoticeIcon },
  {
    label: '이용약관 및 개인정보처리방침',
    to: PATHS.TERMS_OF_SERVICE,
    icon: MypageTermOfServiceIcon,
  },
];
