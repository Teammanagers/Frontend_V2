import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/lib/useAuth';
import { ROUTE_SEGMENTS } from './paths';

/**
 * Guest Only (비로그인 사용자 전용)
 * 이미 로그인한 사용자가 로그인/회원가입 페이지 접근 시 팀 선택 페이지로 리다이렉트
 */
export default function GuestGuard() {
  const isAuthenticated = useAuth();

  if (isAuthenticated)
    return <Navigate to={`/${ROUTE_SEGMENTS.SELECT_TEAM}`} replace />;

  return <Outlet />;
}
