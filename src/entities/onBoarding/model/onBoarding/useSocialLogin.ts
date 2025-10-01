import { useState } from 'react';

export default function useSocialLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);

  const socialLoginProvider = (provider: 'google' | 'kakao' | 'naver') => {
    setIsLoading(true);
    setError(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const urls = {
      google: `${baseUrl}/oauth2/authorization/google`,
      kakao: `${baseUrl}/oauth2/authorization/kakao`,
      naver: `${baseUrl}/oauth2/authorization/naver`,
    };

    const hrefUrl = urls[provider];

    if (hrefUrl) {
      window.location.href = hrefUrl;
    } else {
      setError(true);
      setIsLoading(false);
    }
  };

  return { socialLoginProvider, isLoading, error };
}
