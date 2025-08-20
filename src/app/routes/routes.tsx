import { Route, Routes } from 'react-router-dom';
import { AdminLoginPage } from '@/pages/AdminLoginPage/admin-login';
import { CalendarPage } from '@/pages/CalendarPage';
import { ErrorPage } from '@/pages/ErrorPage';
import JoinPage from '@/pages/JoinPage/join-page';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import MakeTeamPage from '@/pages/MakeTeamPage/make-team';
import { ManagementPage } from '@/pages/ManagementPage';
import { ExtraMemoPage, MemoPage } from '@/pages/MemoPage';
import { MyPage } from '@/pages/MyPage';
import Redirect from '@/pages/RedirectPage/redirect';
import SelectTeamPage from '@/pages/SelectTeamPage/select-team';
import { ResourcePage } from '@/pages/ResourcePage';
import { SignupPage } from '@/pages/SignupPage';
import { TeamPage } from '@/pages/TeamPage';
import { TodoPage } from '@/pages/TodoPage';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* onBoarding 관련 페이지들 */}
        <Route>
          {/* Login Page */}
          <Route path="/login" element={<LoginPage />} />
          {/* sign-up or select Team redirect */}
          <Route path="/redirect" element={<Redirect />} />
          {/* Admin Login Page */}
          <Route path="/login-admin" element={<AdminLoginPage />} />
          {/* Sign Up Page */}
          <Route path="/sign-up" element={<SignupPage />} />
          {/* Make Team Page */}
          <Route path="/make-team" element={<MakeTeamPage />} />
          {/* Team Join page */}
          <Route path="/team-join" element={<JoinPage />} />
          {/* Select Team Page */}
          <Route path="/select-team" element={<SelectTeamPage />} />
        </Route>
        {/* Team Page */}
        <Route path="/team" element={<TeamPage />} />
        {/* Main page */}
        <Route path="/" element={<MainPage />} />
        {/* Calendar Page */}
        <Route path="/calendar" element={<CalendarPage />} />
        {/* Todo Page */}
        <Route path="/todo-list" element={<TodoPage />} />
        {/* Memo Page */}
        <Route path="/memo" element={<MemoPage />} />
        <Route path="/memo/*" element={<ExtraMemoPage />} />
        {/* Resource Page */}
        <Route path="/resource" element={<ResourcePage />} />
        {/* ManagementPage */}
        <Route path="/management" element={<ManagementPage />} />
        {/* My Page */}
        <Route path="/mypage" element={<MyPage />} />

        {/* Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
