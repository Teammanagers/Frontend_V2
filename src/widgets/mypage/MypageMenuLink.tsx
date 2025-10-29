import styled from 'styled-components';
import ArrowIcon from '@/shared/assets/common/arrow.svg?react';
import AppLink, { LinkToType } from '@/shared/components/link/AppLink';

interface MypageMenuLinkProps {
  to: LinkToType;
  icon: React.ReactNode;
  children: React.ReactNode;
}

// 마이페이지 메뉴를 라우팅시키는 링크 컴포넌트
export default function MypageMenuLink({
  to,
  icon,
  children,
}: MypageMenuLinkProps) {
  return (
    <StyledLink to={to}>
      <ContentWrapper>
        <IconWrapper>{icon}</IconWrapper>
        <Label>{children}</Label>
      </ContentWrapper>

      <IconWrapper>
        <ArrowIcon width="32" height="32" stroke="#1d1d1d" strokeWidth="2" />
      </IconWrapper>
    </StyledLink>
  );
}

const StyledLink = styled(AppLink)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  height: 60px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;
