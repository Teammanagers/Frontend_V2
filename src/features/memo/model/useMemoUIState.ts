import { useState } from 'react';
import { Target } from '@/entities/memo/memo.type';
import { FolderType } from '@/shared/types/memo.types.ts';

export function useMemoUIState() {
  const [deleteTarget, setDeleteTarget] = useState<Target | null>(null);
  const [moveTarget, setMoveTarget] = useState<Target | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openFolderModal, setOpenFolderModal] = useState(false);
  const [editFolder, setEditFolder] = useState<FolderType | null>(null);

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
  const handleEditFolderRequest = (folder: FolderType) => {
    setOpenFolderModal(true);
    setEditFolder(folder);
  };
  const closeFolderModal = () => {
    setOpenFolderModal(false);
    setEditFolder(null);
  };
  return {
    deleteTarget,
    moveTarget,
    openAddModal,
    openFolderModal,
    editFolder,
    handlers: {
      handleDeleteRequest,
      handleMoveRequest,
      handleOpenAddModal,
      closeDeleteModal,
      closeMoveModal,
      closeAddModal,
      handleAddFolder,
      handleEditFolderRequest,
      closeFolderModal,
    },
  };
}
