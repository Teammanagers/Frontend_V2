import { useEffect } from 'react';

/**
 * 특정 요소 외부를 클릭했을 때 해당 요소가 닫히도록 하는 커스텀 훅입니다.
 *
 * @param {React.RefObject<HTMLDivElement>} ref - 외부 클릭을 감지할 DOM 요소의 ref
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen - 요소의 열림/닫힘 상태를 제어하는 상태 업데이트 함수
 * @param {boolean} [isIgnoreActive ] - 외부 클릭 감지를 무시할 조건의 활성화 여부
 *
 * 예를 들어, 드롭다운에 ref가 걸려있는 상황에서 모달이 같이 떠 있을 때
 * 드롭다운을 닫히지 않게 하면서 모달만 닫고 싶은 경우,
 * 모달이 떠 있는 동안 외부 클릭을 무시하고 싶을 수 있습니다.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useClickOutside(ref, setIsOpen, isModalOpen); // 커스텀 훅 실행
 *
 * return <div ref={ref}>내용</div>;
 */

const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  setIsOpen:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((isOpen: boolean) => void),
  isIgnoreActive?: boolean,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current && // 필터 메뉴 DOM이 화면에 렌더링 되어 있고
        !ref.current.contains(event.target as Node) && // 현재 클릭된 위치가 필터 메뉴 외부일 때
        !isIgnoreActive // 외부 클릭 무시할 조건이 비활성화일 때 (예: 모달이 열려 있지 않을 때 )
      ) {
        setIsOpen(false);
      }
    };

    // mousedown(마우스 버튼이 눌린 순간) 이벤트가 발생할 때마다 함수
    document.addEventListener('mousedown', handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, isIgnoreActive]);
};

export default useClickOutside;
