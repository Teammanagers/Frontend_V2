import { useState } from 'react';

const SOCIAL_PROVIDERS = {
  GOOGLE: 'google',
  KAKAO: 'kakao',
  NAVER: 'naver',
} as const;

type SocialProvider = (typeof SOCIAL_PROVIDERS)[keyof typeof SOCIAL_PROVIDERS];

export default function useSocialLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);

  const socialLoginProvider = (provider: SocialProvider) => {
    setIsLoading(true);
    setError(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const urls: Record<SocialProvider, string> = {
      [SOCIAL_PROVIDERS.GOOGLE]: `${baseUrl}/oauth2/authorization/google`,
      [SOCIAL_PROVIDERS.KAKAO]: `${baseUrl}/oauth2/authorization/kakao`,
      [SOCIAL_PROVIDERS.NAVER]: `${baseUrl}/oauth2/authorization/naver`,
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

export { SOCIAL_PROVIDERS };
