import { SOCIAL_PROVIDERS_EN } from '@/shared/config/constants/auth.constants';
import { useState } from 'react';

type SocialProvider =
  (typeof SOCIAL_PROVIDERS_EN)[keyof typeof SOCIAL_PROVIDERS_EN];

export default function useSocialLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);

  const socialLoginProvider = (provider: SocialProvider) => {
    setIsLoading(true);
    setError(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const urls: Record<SocialProvider, string> = {
      [SOCIAL_PROVIDERS_EN.GOOGLE]: `${baseUrl}/oauth2/authorization/google`,
      [SOCIAL_PROVIDERS_EN.KAKAO]: `${baseUrl}/oauth2/authorization/kakao`,
      [SOCIAL_PROVIDERS_EN.NAVER]: `${baseUrl}/oauth2/authorization/naver`,
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
