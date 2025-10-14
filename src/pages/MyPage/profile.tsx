import styled from 'styled-components';
import SocialLoginStatus from '@/entities/user/ui/SocialLoginStatus';
import ProfileUpdateForm from '@/features/user/ui/ProfileUpdateForm';
import MypageHeader from '@/widgets/mypage/MypageHeader';
import QuitIcon from '@/shared/assets/mypage/quit.svg?react';

export default function ProfilePage() {
  return (
    <Container>
      <MypageHeader showBackButton>프로필 수정</MypageHeader>

      <ContentWrapper>
        <ProfileUpdateForm />

        <SocialLoginStatusWrapper>
          {/* TODO: API 연동 후 provider 정보 받아서 넘겨주기 */}
          <SocialLoginStatus provider="google" />
        </SocialLoginStatusWrapper>

        <ButtonWrapper>
          <LogoutButton>로그아웃</LogoutButton>
          <QuitButton>
            <QuitIcon />
            회원 탈퇴
          </QuitButton>
        </ButtonWrapper>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 46px 0 0 10%;
`;

const SocialLoginStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 48px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

const ButtonBase = styled.button`
  width: 216px;
  height: 48px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.white};
`;

const LogoutButton = styled(ButtonBase)`
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
  color: ${({ theme }) => theme.colors.darkGray};
`;

const QuitButton = styled(ButtonBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.red};
`;
