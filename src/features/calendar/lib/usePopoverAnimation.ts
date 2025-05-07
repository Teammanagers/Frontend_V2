import { useEffect } from 'react';

const usePopoverAnimation = (
  isPopoverOpen: boolean,
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    if (!isPopoverOpen) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 250); // 애니메이션 지속 시간

      return () => clearTimeout(timeout);
    }
  }, [isPopoverOpen, setIsAnimating]);
};

export { usePopoverAnimation };
