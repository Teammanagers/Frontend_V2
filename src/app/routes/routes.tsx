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
import { ROUTE_SEGMENTS, TEAM_BASE_PATH } from './paths';
import { ProtectedRoute } from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* 비로그인 사용자만 접근 가능한 페이지 */}
        <Route
          path={ROUTE_SEGMENTS.LOGIN}
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTE_SEGMENTS.LOGIN_ADMIN}
          element={
            <ProtectedRoute requireAuth={false}>
              <AdminLoginPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTE_SEGMENTS.SIGN_UP}
          element={
            <ProtectedRoute requireAuth={false}>
              <SignupPage />
            </ProtectedRoute>
          }
        />

        {/* 로그인 필요한 onboarding 페이지 */}
        <Route
          path={ROUTE_SEGMENTS.REDIRECT}
          element={
            <ProtectedRoute requireAuth={true}>
              <Redirect />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTE_SEGMENTS.MAKE_TEAM}
          element={
            <ProtectedRoute requireAuth={true}>
              <MakeTeamPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTE_SEGMENTS.TEAM_JOIN}
          element={
            <ProtectedRoute requireAuth={true}>
              <JoinPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTE_SEGMENTS.SELECT_TEAM}
          element={
            <ProtectedRoute requireAuth={true}>
              <SelectTeamPage />
            </ProtectedRoute>
          }
        />

        {/* 로그인 필요한 메인 페이지들 */}
        <Route
          path={TEAM_BASE_PATH}
          element={
            <ProtectedRoute requireAuth={true}>
              <AppShellLayout />
            </ProtectedRoute>
          }
        >
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

        {/* 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
