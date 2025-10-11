import KaKaoIcon from '@/shared/assets/common/kakao-logo.svg?react';
import NaveerIcon from '@/shared/assets/common/naver-logo.svg?react';
import GoogleIcon from '@/shared/assets/common/google-logo.svg?react';

export const SOCIAL_PROVIDERS_EN = {
  KAKAO: 'kakao',
  NAVER: 'naver',
  GOOGLE: 'google',
} as const;

export const SOCIAL_PROVIDERS_INFO: {
  [key in (typeof SOCIAL_PROVIDERS_EN)[keyof typeof SOCIAL_PROVIDERS_EN]]: {
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    themeColor: string;
    textColor: string;
  };
} = {
  kakao: {
    label: '카카오',
    icon: KaKaoIcon,
    themeColor: '#FEE500',
    textColor: '#000000',
  },
  naver: {
    label: '네이버',
    icon: NaveerIcon,
    themeColor: '#03C75A',
    textColor: '#FFFFFF',
  },
  google: {
    label: '구글',
    icon: GoogleIcon,
    themeColor: '#FFFFFF',
    textColor: '#1D1D1D',
  },
} as const;
