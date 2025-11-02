import { Link, LinkProps } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useTeamStore } from '@/shared/model/store/teamStore';

export type LinkToType = string | ((teamId: number) => string);

interface AppLinkProps extends Omit<LinkProps, 'to'> {
  to: LinkToType;
  children: React.ReactNode;
}

/**
 * @description URL을 자동으로 분석하여 내부/외부 링크를 구분하는 링크 컴포넌트입니다.
 * @param {string} to - 이동할 경로 (예: '/mypage' 또는 'https://google.com')
 * @param {React.ReactNode} children - 링크 내부에 표시될 자식 요소
 * @returns {React.ReactElement} 경로 유형에 따라 `Link` 또는 `a` 태그로 렌더링된 엘리먼트
 *
 * @example
 * // 내부 팀 링크
 * <AppLink to={PATHS.CALENDAR}>프로필</AppLink>
 *
 * // 외부 링크
 * <AppLink to="https://google.com">구글로 이동</AppLink>
 */
export default function AppLink({ to, children, ...props }: AppLinkProps) {
  const teamId = useTeamStore((state) => state.teamId);

  // --- to가 함수인 경우 (내부 팀 링크 e.g. /team/2/calendar) ---
  if (typeof to === 'function') {
    if (!teamId) return null;

    const destinationUrl = to(teamId);

    // 내부 팀 링크인 경우
    return (
      <InternalStyledLink to={destinationUrl} {...props}>
        {children}
      </InternalStyledLink>
    );
  }

  // --- to가 문자열인 경우 (외부 링크 또는 단순 내부 링크) ---
  const destinationUrl = to;
  let isExternalUrl = false;

  try {
    new URL(destinationUrl); // to가 유효한 URL인지 체크
    isExternalUrl = true;
  } catch {
    isExternalUrl = false;
  }

  // 외부 링크인 경우
  if (isExternalUrl) {
    return (
      <ExternalStyledLink
        as="a"
        href={destinationUrl}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </ExternalStyledLink>
    );
  }

  // 단순 내부 링크인 경우 (예: '/login')
  return (
    <InternalStyledLink to={destinationUrl} {...props}>
      {children}
    </InternalStyledLink>
  );
}

const sharedLinkStyles = css`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const InternalStyledLink = styled(Link)`
  ${sharedLinkStyles}
`;

const ExternalStyledLink = styled.a`
  ${sharedLinkStyles}
`;
