import { Link } from 'react-router-dom';
import styled from 'styled-components';
import arrowIcon from '@/shared/assets/common/routing-arrow.svg';

type Size = 'large' | 'medium' | 'small';

//large 443 X 60
//medium auto X 36
//small auto X 31

/**
 * RoutingButton 컴포넌트를 통해 라우팅.
 *
 * @param children - 컴포넌트 안에 들어갈 내용
 * @param url - 링크 URL
 * @param size - 버튼 크기 ('large', 'medium', 'small' 중 하나)
 * @param icon - 선택적으로 아이콘을 추가 가능
 */

interface RoutingButtonProps {
  children: React.ReactNode;
  url: string;
  size: Size;
  icon?: React.ReactNode;
}

export const RoutingButton = ({
  children,
  url,
  size,
  icon,
}: RoutingButtonProps) => {
  return (
    <StyledLink to={url} size={size}>
      <ContentWrapper>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        {children}
      </ContentWrapper>

      {/* arrow 아이콘 크기 동적으로 수정할 수 있도록 */}
      <img src={arrowIcon} alt="arrow-icon" />
    </StyledLink>
  );
};

const StyledLink = styled(Link)<{ size: Size }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: #1d1d1d;
  cursor: pointer;
  ${({ size }) =>
    size === 'small'
      ? `
        width: auto;
        font-size: 18px;
        font-weight: 700;    
        gap: 19px;
        `
      : size === 'medium'
        ? `    
        width: auto;
        font-size: 24px;
        font-weight: 700;    
        gap: 16px;
        `
        : size === 'large'
          ? `
        justify-content: space-between;
        width: 443px;
        height: 60px;
        padding: 10px 12px;
        font-size: 16px;
        font-weight: 500;
        background-color: #ffffff;
        border: 1px solid #f0f0f0;
        border-radius: 4px;
      `
          : ``};
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;
