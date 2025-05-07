import { ISkeletonProps } from '@/shared/types';
import styled, { keyframes } from 'styled-components';

/**
 * Skeleton 컴포넌트는 로딩 상태를 시각적으로 나타내기 위해 사용됩니다.
 *
 * @param {number} width - Skeleton 컴포넌트의 너비
 * @param {number} height - Skeleton 컴포넌트의 높이
 *
 * @example
 * <Skeleton width={300} height={100} />
 *
 * @example
 * {Array.from({ length: 3 }).map((_, index) => (
 *   <Skeleton key={index} width={300} height={100} />
 * ))}
 */

export default function Skeleton({ width, height }: ISkeletonProps) {
  return <Container $width={width} $height={height} />;
}

const SkeletonLoading = keyframes`
  0% {
    background-color: #F0F0F0;
  }
  100% {
    background-color: #E6EDF5;
  }`;

const Container = styled.div<{ $width: number; $height: number }>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  border-radius: 10px;
  animation: ${SkeletonLoading} 0.7s linear infinite alternate;
`;
