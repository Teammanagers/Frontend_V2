import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/lib/useAuth';
import { ROUTE_SEGMENTS } from './paths';

/**
 * Authenticated Only (로그인 사용자 전용)
 * 비로그인 사용자가 메인/온보딩 페이지 접근 시 로그인 페이지로 리다이렉트
 */
export default function AuthGuard() {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (!isAuth)
    return (
      <Navigate
        to={`/${ROUTE_SEGMENTS.LOGIN}`}
        state={{ from: location }}
        replace
      />
    );

  return <Outlet />;
}
