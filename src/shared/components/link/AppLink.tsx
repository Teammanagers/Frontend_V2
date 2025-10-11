import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

interface AppLinkProps extends LinkProps {
  to: string;
  children: React.ReactNode;
}

/**
 * @description URL을 자동으로 분석하여 내부/외부 링크를 구분하는 링크 컴포넌트입니다.
 * @param {string} to - 이동할 경로 (예: '/mypage' 또는 'https://google.com')
 * @param {React.ReactNode} children - 링크 내부에 표시될 자식 요소
 * @returns {React.ReactElement} 경로 유형에 따라 `Link` 또는 `a` 태그로 렌더링된 엘리먼트
 *
 * @example
 * // 내부 링크
 * <AppLink to="/user/profile">프로필</AppLink>
 *
 * @example
 * // 외부 링크
 * <AppLink to="https://google.com">구글로 이동</AppLink>
 */
export default function AppLink({ to, children, ...props }: AppLinkProps) {
  let isExternalURL = false;

  if (typeof to === 'string') {
    try {
      new URL(to); // to가 유효한 URL인지 체크
      isExternalURL = true;
    } catch (e) {
      isExternalURL = false;
    }
  }

  // 외부 링크인 경우
  if (isExternalURL) {
    return (
      <StyledLink to={to} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </StyledLink>
    );
  }

  // 내부 링크인 경우
  return (
    <StyledLink to={to} {...props}>
      {children}
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;
