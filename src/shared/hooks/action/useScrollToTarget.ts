import { useEffect, useRef, useState, useCallback } from 'react';

// 스크롤 동작 옵션 타입
interface ScrollConfig {
  behavior?: ScrollBehavior; // 'auto' | 'smooth' | 'instant'
  block?: ScrollLogicalPosition; // 'start' | 'center' | 'end' | 'nearest'
}

type ScrollTarget =
  | { type: 'BOTTOM'; options?: ScrollConfig }
  | { type: 'ELEMENT'; id: string | number; options?: ScrollConfig };

interface UseScrollToTargetProps {
  dependency: unknown;
  elementIdPrefix?: string;
  scrollDelay?: number;
}

/**
 * 데이터 변경(dependency)을 감지하여 특정 요소나 페이지의 맨 아래로 스크롤을 이동시키는 훅입니다.
 *
 * @param {unknown} dependency - 스크롤 트리거가 될 의존성 데이터 (예: 리스트 배열). 이 값이 변경될 때 스크롤 로직이 실행됩니다.
 * @param {string} [elementIdPrefix=''] - 타겟 요소 ID의 접두사. (예: `feedback-`로 설정 시 id가 `1`이면 `feedback-1` 요소를 찾아 스크롤)
 * @param {number} [scrollDelay=0] - 스크롤 동작 전 DOM이 렌더링 가능한 상태가 될 때까지 기다리는 지연 시간(ms). 렌더링 직후 스크롤이 무시되는 현상을 방지하기 위해 사용합니다.
 *
 * @example
 * ```tsx
 * [Bottom] 맨 아래로 스크롤
 * const { bottomRef, scrollToBottom } = useScrollToTarget({ dependency: messages });
 *
 *   <button onClick={() => scrollToBottom()}>맨 아래로</button>
 *
 *   // 스크롤의 기준점이 될 요소에 ref 연결 필수
 *   <div ref={bottomRef} />
 * ```
 *
 * @example
 * // [Element] 특정 ID 위치로 스크롤
 * const { scrollToElement } = useScrollToTarget({
 *   dependency: items,
 *   elementIdPrefix: 'item-' // 실제 DOM ID는 "item-1", "item-2" 형식
 * });
 *
 * <button onClick={() => scrollToElement(5)}>5번 아이템으로 이동</button>
 * {items.map(item => (
 *   <div key={item.id} id={`item-${item.id}`} />
 * ))}
 */

export const useScrollToTarget = ({
  dependency,
  elementIdPrefix = '',
  scrollDelay = 0,
}: UseScrollToTargetProps) => {
  const [target, setTarget] = useState<ScrollTarget | null>(null);

  // 맨 아래 위치
  const bottomRef = useRef<HTMLDivElement>(null);

  // 특정 ID 요소로 스크롤
  const scrollToElement = useCallback(
    (id: number | string, options?: ScrollConfig) => {
      setTarget({ type: 'ELEMENT', id, options });
    },
    [],
  );

  // 맨 아래로 스크롤
  const scrollToBottom = useCallback((options?: ScrollConfig) => {
    setTarget({ type: 'BOTTOM', options });
  }, []);

  useEffect(() => {
    if (!target) return;

    const timer = setTimeout(() => {
      const behavior = target.options?.behavior || 'smooth';
      const block = target.options?.block || 'center';

      if (target.type === 'BOTTOM') {
        // 맨 아래로 스크롤
        bottomRef.current?.scrollIntoView({ behavior, block: 'end' });
      } else if (target.type === 'ELEMENT') {
        // 특정 ID 요소 찾아서 스크롤
        const elementId = `${elementIdPrefix}${target.id}`;
        const element = document.getElementById(elementId);

        if (element) {
          element.scrollIntoView({ behavior, block });
        } else {
          console.warn(`[useScrollToTarget] Element not found: #${elementId}`);
        }
      }

      // 동작 수행 후 타겟 초기화 (재실행 방지)
      setTarget(null);
    }, scrollDelay);

    return () => clearTimeout(timer);
  }, [dependency, target, elementIdPrefix, scrollDelay]);

  return {
    bottomRef,
    scrollToElement,
    scrollToBottom,
  };
};
