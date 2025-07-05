import { useState } from 'react';
import { Target } from '@/entities/memo/memo.type';

export function useMemoUIState() {
  const [deleteTarget, setDeleteTarget] = useState<Target | null>(null);
  const [moveTarget, setMoveTarget] = useState<Target | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openFolderModal, setOpenFolderModal] = useState(false);

  const handleDeleteRequest = (target: Target) => setDeleteTarget(target);
  const handleMoveRequest = (target: Target) => setMoveTarget(target);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const closeDeleteModal = () => setDeleteTarget(null);
  const closeMoveModal = () => setMoveTarget(null);
  const closeAddModal = () => setOpenAddModal(false);
  const handleAddFolder = () => {
    closeAddModal();
    setOpenFolderModal(true);
  };
  const closeFolderModal = () => setOpenFolderModal(false);

  return {
    deleteTarget,
    moveTarget,
    openAddModal,
    openFolderModal,
    handlers: {
      handleDeleteRequest,
      handleMoveRequest,
      handleOpenAddModal,
      closeDeleteModal,
      closeMoveModal,
      closeAddModal,
      handleAddFolder,
      closeFolderModal,
    },
  };
}
