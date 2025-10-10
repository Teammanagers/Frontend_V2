import ProfileUpdateForm from '@/features/user/ui/ProfileUpdateForm';
import MypageHeader from '@/widgets/mypage/MypageHeader';
import styled from 'styled-components';

export default function ProfilePage() {
  return (
    <Container>
      <MypageHeader showBackButton>프로필 수정</MypageHeader>

      <ProfileUpdateForm />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
