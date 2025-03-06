import { CalendarPage } from '@/pages/CalendarPage';
import { ErrorPage } from '@/pages/ErrorPage';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { ManagementPage } from '@/pages/Management Page';
import { MemoPage } from '@/pages/MemoPage';
import { MyPage } from '@/pages/MyPage';
import { SharePage } from '@/pages/SharePage';
import { SignupPage } from '@/pages/SignupPage';
import { TeamPage } from '@/pages/TeamPage';
import { ModalTestPage } from '@/pages/test/modal';
import { TodoPage } from '@/pages/TodoPage';
import { Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />
        {/* Signup page */}
        <Route path="/signup" element={<SignupPage />} />
        {/* Team Page */}
        <Route path="/team" element={<TeamPage />} />
        {/* Main page */}
        <Route path="/" element={<MainPage />} />
        {/* Calendar Page */}
        <Route path="/calendar" element={<CalendarPage />} />
        {/* Todo Page */}
        <Route path="/todo" element={<TodoPage />} />
        {/* Memo Page */}
        <Route path="/memo" element={<MemoPage />} />
        {/* Share Page */}
        <Route path="/share" element={<SharePage />} />
        {/* Management Page */}
        <Route path="/management" element={<ManagementPage />} />
        {/* My Page */}
        <Route path="/mypage" element={<MyPage />} />

        {/* Modal Test Page */}
        <Route path="/test/modal" element={<ModalTestPage />} />
        {/* Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
