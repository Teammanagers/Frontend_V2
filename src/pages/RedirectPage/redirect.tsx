import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiRequest from '@/shared/api/apiRequest';

export default function Redirect() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();

  const tokenMutation = useMutation({
    mutationFn: async (code: string) => {
      const response = await apiRequest({
        url: '/api/v2/auth/token',
        method: 'POST',
        data: { code },
      });
      return response;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken); // 관리 방식 논의 필요
      // data에서 유저 회원가입 여부 flag에 따라 navigate
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

    tokenMutation.mutate(code);
  }, [code]);

  return <div>로그인 대기중</div>;
}
