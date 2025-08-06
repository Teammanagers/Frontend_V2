import { useTokenMutation } from '@/entities/onBoarding/model/onBoarding/useTokenMutation';

export default function Redirect() {
  useTokenMutation();
  // TODO 리다이렉트 페이지 제작 요청
  return <div>로그인 대기중</div>;
}
