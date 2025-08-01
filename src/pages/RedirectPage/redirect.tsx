import { useTokenMutation } from '@/features/onBoarding/hooks/useTokenMutation';

export default function Redirect() {
  useTokenMutation();
  return <div>로그인 대기중</div>;
}
