import { useResourceDeleteModal } from '@/features/resource/model/useResourceDeleteModal';
import { useDeleteResource } from '@/features/resource/model/useResourceQueries';

// 자료 삭제 로직을 관리하는 커스텀 훅
export const useResourceDeletion = () => {
  const { mutate: deleteResource } = useDeleteResource();
  const {
    isDeleteModalOpen,
    toggleDeleteModal,
    selectedResourceId,
    openDeleteModal,
  } = useResourceDeleteModal();

  // 삭제 확인 핸들러
  const confirmDelete = () => {
    if (selectedResourceId === null) return;
    deleteResource(selectedResourceId, {
      onSuccess: () => {
        toggleDeleteModal();
      },
      onError: () => {
        alert('자료 삭제에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  return {
    isDeleteModalOpen,
    toggleDeleteModal,
    openDeleteModal,
    confirmDelete,
  };
};
