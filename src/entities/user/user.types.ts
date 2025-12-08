import { SOCIAL_PROVIDERS_EN } from '@/shared/config/constants/auth.constants';

// 소셜 로그인 제공자 정보
export interface ProviderInfo {
  provider: (typeof SOCIAL_PROVIDERS_EN)[keyof typeof SOCIAL_PROVIDERS_EN];
  providerId: string;
}

// 사용자 정보
export interface User {
  id: number;
  name: string;
  birth: string | null;
  email: string | null;
  telNum: string | null;
  belong: string | null;
  providerInfo: ProviderInfo;
  role: string;
  createdAt: string;
  updatedAt: string;
  useYn: string;
}
