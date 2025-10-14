import styled from 'styled-components';
import {
  SOCIAL_PROVIDERS_EN,
  SOCIAL_PROVIDERS_INFO,
} from '@/shared/config/constants/auth.constants';

interface SocialLoginStatusProps {
  provider: (typeof SOCIAL_PROVIDERS_EN)[keyof typeof SOCIAL_PROVIDERS_EN];
}

// 소셜 로그인 상태 배지 컴포넌트
export default function SocialLoginStatus({
  provider,
}: SocialLoginStatusProps) {
  const providerInfo = SOCIAL_PROVIDERS_INFO[provider];
  const Icon = providerInfo.icon;

  return (
    <BadgeContainer
      $isGoogle={provider === SOCIAL_PROVIDERS_EN.GOOGLE}
      $themeColor={providerInfo.themeColor}
    >
      <IconWrapper>
        <Icon width={23} height={23} />
      </IconWrapper>
      <Label $textColor={providerInfo.textColor}>
        {providerInfo.label} 계정으로 로그인 중
      </Label>
    </BadgeContainer>
  );
}

const BadgeContainer = styled.div<{ $isGoogle: boolean; $themeColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 216px;
  height: 49px;
  border: 1px solid
    ${({ $isGoogle, theme }) =>
      $isGoogle ? theme.colors.darkGray : 'transparent'};
  border-radius: 8px;
  background-color: ${({ $themeColor }) => $themeColor};
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.span<{ $textColor: string }>`
  font-size: 12px;
  font-weight: 700;
  color: ${({ $textColor }) => $textColor};
`;
