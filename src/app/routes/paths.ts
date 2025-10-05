import { TodoList } from '@/widgets/main';
import RecentResourceList from '@/widgets/resource/RecentResourceList';
import { UpcomingEventList } from '@/widgets/upcoming-event';

interface RouteConfig {
  label: string; // 네비게이션 링크에 표시될 텍스트
  to: string; // 경로
  component?: React.ComponentType; // 해당 경로에 렌더링될 컴포넌트
}

export const PATHS = {
  /* 투두리스트 */
  TODO_LIST: '/todo-list',

  /* 캘린더 */
  CALENDAR: '/calendar',

  /* 자료실 */
  RESOURCE: '/resource',

  /* 메모 */
  MEMO: '/memo',

  MY_PAGE: '/mypage',
  PROFILE: '/mypage/profile',

  /* 공지사항 페이지 */
  NOTICE: '/notice',

  /* 이용약관 및 개인정보처리방침 페이지 */
  TERMS_OF_SERVICE:
    'https://teammanagers.notion.site/a0e670c730424f56b4c1bfe4627f70a2?source=copy_link',
};

export const mainRoutes: RouteConfig[] = [
  { label: '다가오는 일정', to: PATHS.CALENDAR, component: UpcomingEventList },
  { label: '투두리스트', to: PATHS.TODO_LIST, component: TodoList },
  {
    label: '최근 업데이트 된 자료',
    to: PATHS.RESOURCE,
    component: RecentResourceList,
  },
  { label: '고정된 메모', to: PATHS.MEMO },
];

export const mypageRoutes: RouteConfig[] = [
  { label: '프로필 수정', to: PATHS.PROFILE },
  { label: '공지사항', to: PATHS.NOTICE },
  {
    label: '이용약관 및 개인정보처리방침',
    to: PATHS.TERMS_OF_SERVICE,
  },
];
