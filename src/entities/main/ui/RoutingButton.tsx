import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ArrowIcon from '@/shared/assets/common/arrow.svg?react';
import { IRoutingButtonProps } from '../main.types';

/**
 * RoutingButton 컴포넌트를 통해 라우팅.
 *
 * @param children - 컴포넌트 안에 들어갈 내용
 * @param url - 링크 URL
 *
 */

function RoutingButton({ children, url }: IRoutingButtonProps) {
  return (
    <StyledLink to={url}>
      <ContentWrapper>
        <RoutingLabel>{children}</RoutingLabel>
      </ContentWrapper>
      {/* arrow 아이콘 크기 동적으로 수정할 수 있도록 */}
      <ArrowIconWrapper>
        <ArrowIcon width="36" height="36" strokeWidth="3" />
      </ArrowIconWrapper>
    </StyledLink>
  );
}

export { RoutingButton };

const StyledLink = styled(Link)`
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
