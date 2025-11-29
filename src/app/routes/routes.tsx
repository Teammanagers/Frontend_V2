import { Route, Routes } from 'react-router-dom';
import AppShellLayout from '@/pages/_layouts/AppShellLayout.tsx';
import { AdminLoginPage } from '@/pages/AdminLoginPage/admin-login';
import { CalendarPage } from '@/pages/CalendarPage';
import { EndPage } from '@/pages/EndPage';
import { ErrorPage } from '@/pages/ErrorPage';
import JoinPage from '@/pages/JoinPage/join-page';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import MakeTeamPage from '@/pages/MakeTeamPage/make-team';
import { ManagementPage } from '@/pages/ManagementPage';
import { ExtraMemoPage, RedirectToRootFolder } from '@/pages/MemoPage';
import { MyPage } from '@/pages/MyPage';
import ProfilePage from '@/pages/MyPage/profile';
import NoticePage from '@/pages/NoticePage/notice';
import Redirect from '@/pages/RedirectPage/redirect';
import { ResourcePage } from '@/pages/ResourcePage';
import SelectTeamPage from '@/pages/SelectTeamPage/select-team';
import { SignupPage } from '@/pages/SignupPage';
import { TodoPage } from '@/pages/TodoPage';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';
import { ROUTE_SEGMENTS, TEAM_BASE_PATH } from './paths';
import RootRedirect from './RootRedirect';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* 기본 루트 처리: 권한에 따라 자동 분기 */}
        <Route path="/" element={<RootRedirect />} />

        {/* 비로그인 사용자 전용 페이지 */}
        <Route element={<GuestGuard />}>
          <Route path={ROUTE_SEGMENTS.LOGIN} element={<LoginPage />} />
          <Route
            path={ROUTE_SEGMENTS.LOGIN_ADMIN}
            element={<AdminLoginPage />}
          />
          <Route path={ROUTE_SEGMENTS.SIGN_UP} element={<SignupPage />} />
        </Route>

        {/* 로그인 사용자 전용 페이지 */}
        <Route element={<AuthGuard />}>
          {/* 온보딩 */}
          <Route path={ROUTE_SEGMENTS.REDIRECT} element={<Redirect />} />
          <Route path={ROUTE_SEGMENTS.MAKE_TEAM} element={<MakeTeamPage />} />
          <Route path={ROUTE_SEGMENTS.TEAM_JOIN} element={<JoinPage />} />
          <Route
            path={ROUTE_SEGMENTS.SELECT_TEAM}
            element={<SelectTeamPage />}
          />

          {/* 메인 서비스 */}
          <Route path={TEAM_BASE_PATH} element={<AppShellLayout />}>
            {/* 메인 페이지 */}
            <Route index element={<MainPage />} />

            {/* 투두 페이지 */}
            <Route path={ROUTE_SEGMENTS.TODO_LIST} element={<TodoPage />} />

            {/* 캘린더 페이지 */}
            <Route path={ROUTE_SEGMENTS.CALENDAR} element={<CalendarPage />} />

            {/* 메모 페이지 */}
            <Route
              path={ROUTE_SEGMENTS.MEMO}
              element={<RedirectToRootFolder />}
            />
            <Route
              path={`${ROUTE_SEGMENTS.MEMO}/*`}
              element={<ExtraMemoPage />}
            />

            {/* 자료 페이지 */}
            <Route path={ROUTE_SEGMENTS.RESOURCE} element={<ResourcePage />} />

            {/* 팀 관리 페이지 */}
            <Route
              path={ROUTE_SEGMENTS.MANAGEMENT}
              element={<ManagementPage />}
            />

            {/* 마이 페이지 */}
            <Route path={ROUTE_SEGMENTS.MY_PAGE} element={<MyPage />} />
            <Route
              path={ROUTE_SEGMENTS.MY_PAGE_PROFILE}
              element={<ProfilePage />}
            />

            {/* 공지 페이지 */}
            <Route path={ROUTE_SEGMENTS.NOTICE} element={<NoticePage />} />

            {/* 팀 종료 페이지 */}
            <Route path={ROUTE_SEGMENTS.END} element={<EndPage />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
