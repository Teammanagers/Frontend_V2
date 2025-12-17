import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiRequest from '@/shared/api/apiRequest';
import { useAuthStore } from '@/shared/model/store/authStore';

export const useTokenMutation = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const tokenMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest({
        url: '/api/v2/auth/token',
        method: 'POST',
        data: { code },
      });
      return response;
    },
    onSuccess: (data) => {
      login(data.accessToken, data.refreshToken);

      if (data.isNewUser === false) {
        navigate('/select-team');
      } else {
        navigate('/sign-up');
      }
    },
    onError: () => {
      alert('로그인에 실패하였습니다.');
      navigate('/login');
    },
  });

  useEffect(() => {
    if (!code) {
      alert('코드가 없습니다.');
      navigate('/login');
      return;
    }

    tokenMutation.mutate();
  }, [code]);

  return {};
};
