import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_SEGMENTS } from '@/app/routes/paths';
import { useAuthStore } from '@/shared/model/store/authStore';
import { useTeamStore } from '@/shared/model/store/teamStore';

export const useAuth = () => {
  const navigate = useNavigate();

  const isAuth = useAuthStore((state) => state.isAuth);
  const loginAction = useAuthStore((state) => state.login);
  const logoutAction = useAuthStore((state) => state.logout);

  const clearTeamIds = useTeamStore((state) => state.clearTeamIds);

  const logout = useCallback(() => {
    clearTeamIds();
    logoutAction();

    navigate(`/${ROUTE_SEGMENTS.LOGIN}`, { replace: true });
  }, [clearTeamIds, logoutAction, navigate]);

  return { isAuth, login: loginAction, logout };
};
