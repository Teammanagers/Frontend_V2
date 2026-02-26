import styled, { css, keyframes } from 'styled-components';

interface SkeletonProps {
  width: string;
  height: string;
  variant?: 'rect' | 'circle';
}

/**
 * Skeleton 컴포넌트는 로딩 상태를 시각적으로 나타내기 위해 사용됩니다.
 *
 * @param {string} width - Skeleton 컴포넌트의 너비
 * @param {string} height - Skeleton 컴포넌트의 높이
 * @param {'rect' | 'circle'} variant - Skeleton 컴포넌트의 형태 (사각형 또는 원형)
 *
 * @example
 * <Skeleton width="300px" height="100px" />
 *
 * @example
 * {Array.from({ length: 3 }).map((_, index) => (
 *   <Skeleton key={index} width="300px" height="100px" />
 * ))}
 */

export default function Skeleton({
  width,
  height,
  variant = 'rect',
}: SkeletonProps) {
  return <Container $width={width} $height={height} $variant={variant} />;
}

const SkeletonLoading = keyframes`
  0% {
    background-color: #F0F0F0;
  }
  100% {
    background-color: #E6EDF5;
  }`;

const Container = styled.div<{
  $width: string;
  $height: string;
  $variant: 'rect' | 'circle';
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  // border-radius: 10px;
  animation: ${SkeletonLoading} 0.7s linear infinite alternate;

  ${({ $variant }) =>
    $variant === 'circle'
      ? css`
          border-radius: 50%;
        `
      : css`
          border-radius: 10px;
        `}
`;
