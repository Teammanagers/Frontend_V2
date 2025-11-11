import { Route, Routes } from 'react-router-dom';
import AppShellLayout from '@/pages/_layouts/AppShellLayout.tsx';
import { AdminLoginPage } from '@/pages/AdminLoginPage/admin-login';
import { CalendarPage } from '@/pages/CalendarPage';
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
import { ProtectedRoute } from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* onBoarding 관련 페이지들 */}
        <Route>
          {/* Login Page */}
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          {/* Admin Login Page */}
          <Route
            path="/login-admin"
            element={
              <ProtectedRoute requireAuth={false}>
                <AdminLoginPage />
              </ProtectedRoute>
            }
          />
          {/* Sign Up Page */}
          <Route
            path="/sign-up"
            element={
              <ProtectedRoute requireAuth={false}>
                <SignupPage />
              </ProtectedRoute>
            }
          />

          {/* sign-up or select Team redirect */}
          <Route
            path="/redirect"
            element={
              <ProtectedRoute requireAuth={false}>
                <Redirect />
              </ProtectedRoute>
            }
          />
          {/* Make Team Page */}
          <Route
            path="/make-team"
            element={
              <ProtectedRoute requireAuth={true}>
                <MakeTeamPage />
              </ProtectedRoute>
            }
          />
          {/* Team Join page */}
          <Route
            path="/team-join"
            element={
              <ProtectedRoute requireAuth={true}>
                <JoinPage />
              </ProtectedRoute>
            }
          />
          {/* Select Team Page */}
          <Route
            path="/select-team"
            element={
              <ProtectedRoute requireAuth={true}>
                <SelectTeamPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 사이드바 띄워지는 페이지 */}
        <Route
          element={
            <ProtectedRoute requireAuth={true}>
              <AppShellLayout />
            </ProtectedRoute>
          }
        >
          {/* Main page */}
          <Route path="/" element={<MainPage />} />
          {/* Calendar Page */}
          <Route path="/calendar" element={<CalendarPage />} />
          {/* Todo Page */}
          <Route path="/todo-list" element={<TodoPage />} />
          {/* Memo Page */}
          <Route path="/memo" element={<RedirectToRootFolder />} />
          <Route path="/memo/*" element={<ExtraMemoPage />} />
          {/* Resource Page */}
          <Route path="/resource" element={<ResourcePage />} />
          {/* ManagementPage */}
          <Route path="/management" element={<ManagementPage />} />
          {/* My Page */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/profile" element={<ProfilePage />} />
          {/* Notice Page */}
          <Route path="/notice" element={<NoticePage />} />
        </Route>

        {/* Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
