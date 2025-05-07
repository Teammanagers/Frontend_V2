import { useEffect, useState } from 'react';

/**
 * 비동기 작업의 대기 상태를 기반으로 일정 시간 후에 스켈레톤 UI를 표시하는 커스텀 훅입니다.
 *
 * @param {number} delay - 스켈레톤 UI를 표시하기 전 대기 시간(밀리초 단위)
 * @param {boolean | undefined} isPending - 비동기 작업의 대기 상태를 나타내는 값
 * @returns {boolean} - 스켈레톤 UI를 표시할지 여부를 나타내는 상태 값
 *
 * @example
 * const showSkeleton = useDelayPendingState(500, isPending);
 *
 * return (
 *   <>
 *     {showSkeleton ? <Skeleton /> : <Content />}
 *   </>
 * );
 */

const useDelayPendingState = (
  delay: number,
  isPending: boolean | undefined,
) => {
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);

  useEffect(() => {
    // [delay] 후에 스켈레톤 렌더링
    const timer = setTimeout(() => {
      if (isPending) setShowSkeleton(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [isPending]);

  return showSkeleton;
};

export default useDelayPendingState;
