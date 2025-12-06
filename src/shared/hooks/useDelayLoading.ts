import { useEffect, useState } from 'react';

/**
 * 로딩 상태가 너무 빨리 끝날 경우 깜빡임을 방지하기 위해
 * 일정 시간(delay) 이상 로딩이 지속될 때만 true를 반환하는 훅
 *
 * @param condition - 원본 로딩 상태 (isPending)
 * @param delay - 지연 시간 (ms)
 */
export function useDelayLoading(condition: boolean, delay: number = 300) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (condition) {
      // 로딩이 시작되면 타이머 설정
      timer = setTimeout(() => {
        setShowLoading(true);
      }, delay);
    } else {
      // 로딩이 끝나면 즉시 상태 해제
      setShowLoading(false);
    }

    return () => {
      // 컴포넌트 언마운트나 condition 변경 시 타이머 취소
      // (즉, delay 시간 안에 로딩이 끝나면 setShowLoading(true)가 실행되지 않음)
      clearTimeout(timer);
    };
  }, [condition, delay]);

  return showLoading;
}
