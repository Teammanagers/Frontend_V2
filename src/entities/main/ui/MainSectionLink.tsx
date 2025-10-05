import styled from 'styled-components';
import ArrowIcon from '@/shared/assets/common/arrow.svg?react';
import AppLink from '@/shared/components/link/AppLink';

interface MainSectionLinkProps {
  children: React.ReactNode;
  to: string;
}

/**
 * MainSectionLink 컴포넌트를 통해 라우팅.
 *
 * @param children - 컴포넌트 안에 들어갈 내용
 * @param to - 링크 URL
 *
 */

export default function MainSectionLink({
  children,
  to,
}: MainSectionLinkProps) {
  return (
    <StyledLink to={to}>
      <ContentWrapper>
        <RoutingLabel>{children}</RoutingLabel>
      </ContentWrapper>
      {/* arrow 아이콘 크기 동적으로 수정할 수 있도록 */}
      <ArrowIconWrapper>
        <ArrowIcon width="36" height="36" stroke="#1d1d1d" strokeWidth="3" />
      </ArrowIconWrapper>
    </StyledLink>
  );
}

const StyledLink = styled(AppLink)`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #1d1d1d;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;

const RoutingLabel = styled.h2`
  width: auto;
  font-size: 24px;
  font-weight: 700;
  gap: 16px;
`;

const ArrowIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
