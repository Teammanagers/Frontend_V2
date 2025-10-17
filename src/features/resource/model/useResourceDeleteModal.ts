import useToggle from '@/shared/hooks/action/useToggle';
import { useEffect, useState } from 'react';

// 자료 삭제 모달을 관리하고 선택된 자료 ID를 추적하는 커스텀 훅
export const useResourceDeleteModal = () => {
  const { isOpen, toggle } = useToggle();
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(
    null,
  );

  // 삭제 모달 열기 핸들러
  const openDeleteModal = (
    e: React.MouseEvent<HTMLButtonElement>,
    resourceId: number,
  ) => {
    e.stopPropagation();
    setSelectedResourceId(resourceId);
    toggle();
  };

  // 모달이 닫힐 때 선택된 자료 초기화
  useEffect(() => {
    if (!isOpen) {
      setSelectedResourceId(null);
    }
  }, [isOpen]);

  return {
    isDeleteModalOpen: isOpen,
    toggleDeleteModal: toggle,
    selectedResourceId,
    openDeleteModal,
  };
};
