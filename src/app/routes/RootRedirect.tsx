import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/lib/useAuth';
import { ROUTE_SEGMENTS } from './paths';

export default function RootRedirect() {
  const isAuthenticated = useAuth();

  const target = isAuthenticated
    ? `/${ROUTE_SEGMENTS.SELECT_TEAM}`
    : `/${ROUTE_SEGMENTS.SELECT_TEAM}`;

  return <Navigate to={target} replace />;
}
