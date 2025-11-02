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

export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* onBoarding 관련 페이지들 */}
        <Route>
          {/* 로그인 페이지 */}
          <Route path={ROUTE_SEGMENTS.LOGIN} element={<LoginPage />} />

          {/* 회원가입 or 팀 선택 리다이렉트 */}
          <Route path={ROUTE_SEGMENTS.REDIRECT} element={<Redirect />} />

          {/* 어드민 로그인 페이지 */}
          <Route
            path={ROUTE_SEGMENTS.LOGIN_ADMIN}
            element={<AdminLoginPage />}
          />

          {/* 회원가입 페이지 */}
          <Route path={ROUTE_SEGMENTS.SIGN_UP} element={<SignupPage />} />

          {/* 팀 만들기 페이지*/}
          <Route path={ROUTE_SEGMENTS.MAKE_TEAM} element={<MakeTeamPage />} />

          {/* 팀 참가 페이지 */}
          <Route path={ROUTE_SEGMENTS.TEAM_JOIN} element={<JoinPage />} />

          {/* 팀 선택 페이지 */}
          <Route
            path={ROUTE_SEGMENTS.SELECT_TEAM}
            element={<SelectTeamPage />}
          />
        </Route>

        {/* 사이드바 띄워지는 페이지 */}
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
          <Route path="end" element={<EndPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
