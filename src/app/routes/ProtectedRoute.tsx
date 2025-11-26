import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTE_SEGMENTS } from './paths';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
}: ProtectedRouteProps) {
  const location = useLocation();
  const accessToken = localStorage.getItem('accessToken');
  const isAuthenticated = !!accessToken;

  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate
        to={`/${ROUTE_SEGMENTS.LOGIN}`}
        state={{ from: location }}
        replace
      />
    );
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to={`/${ROUTE_SEGMENTS.SELECT_TEAM}`} replace />;
  }

  return <>{children}</>;
}
