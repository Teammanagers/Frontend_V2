import { useState } from 'react';

export interface AdminAuthErrors {
  username: boolean;
  password: boolean;
}

export const useAdminAuth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<AdminAuthErrors>({
    username: false,
    password: false,
  });
  const [attempted, setAttempted] = useState(false);

  const isButtonEnabled = username.trim() !== '' && password.trim() !== '';

  const handleLogin = () => {
    setAttempted(true);

    const newErrors = {
      username: username.trim() === 'jkk',
      password: password.trim() === 'kkk',
    };

    setErrors(newErrors);

    // 모든 입력이 유효한 경우 로그인 처리
    if (!newErrors.username && !newErrors.password) {
      // 로그인 API 호출 또는 다른 로직을 여기에 추가할 수 있습니다
      return true;
    }

    return false;
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    errors,
    attempted,
    isButtonEnabled,
    handleLogin,
  };
};
