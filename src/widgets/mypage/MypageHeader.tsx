import styled from 'styled-components';
import { PATHS } from '@/app/routes/paths';
import ArrowIcon from '@/shared/assets/common/arrow.svg?react';
import { useTeamNavigate } from '@/shared/hooks/useTeamNavigate';

interface MypageHeaderProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  onBackButton?: () => void;
}

/**
 * @description 마이 페이지의 제목과 특정 경로로 이동하는 링크(뒤로 가기 아이콘)를 표시하는 공통 헤더 컴포넌트입니다.
 * @param {React.ReactNode} children - 헤더에 제목으로 표시될 텍스트 또는 자식 엘리먼트.
 * @param {boolean} [showBackButton] - (Optional) true일 경우 뒤로 가기 아이콘을 표시합니다.
 * @param {() => void} onBackButton - 뒤로 가기 아이콘 클릭 시 호출되는 콜백 함수.
 *
 * @example
 * <MypageHeader showBackButton>프로필 수정</ MypageHeader>
 */

export default function MypageHeader({
  children,
  showBackButton = false,
  onBackButton,
}: MypageHeaderProps) {
  const teamNavigate = useTeamNavigate();

  const handleBackButtonClick = () => {
    teamNavigate(PATHS.MY_PAGE);
    if (onBackButton) onBackButton();
  };

  return (
    <Container>
      {showBackButton && (
        <BackButton onClick={handleBackButtonClick}>
          <ArrowIcon
            width={40}
            height={40}
            stroke="#1d1d1d"
            strokeWidth="2.5"
          />
        </BackButton>
      )}
      <Label>{children}</Label>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 100px 0 0 5%;
`;

const BackButton = styled.button`
  justify-content: center;
  transform: rotate(180deg);
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;
