import styled, { keyframes } from 'styled-components';

export default function LoadingSpinner({ size = 48 }: { size?: number }) {
  return (
    <SpinnerWrapper $size={size}>
      <Spinner />
    </SpinnerWrapper>
  );
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  display: inline-block;
`;

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    rgba(92, 158, 255, 0) 0deg,
    rgba(92, 158, 255, 1) 360deg
  );
  mask: radial-gradient(farthest-side, transparent 80%, black 80.5%);
  -webkit-mask: radial-gradient(farthest-side, transparent 80%, black 80.5%);
  animation: ${spin} 1.3s linear infinite;
`;
