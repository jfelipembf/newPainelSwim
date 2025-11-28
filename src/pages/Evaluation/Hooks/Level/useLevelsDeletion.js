import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteLevel } from "../../../../store/levels/actions";
import { LEVEL_FIELDS } from "../../../../constants/levels";

const resolveLevelId = (level) => level?.id || level?.[LEVEL_FIELDS.idLevel];

const useLevelsDeletion = () => {
  const dispatch = useDispatch();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openDeleteModal = useCallback((level) => {
    setDeleteTarget(level || null);
    setModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setModalOpen(false);
    setDeleteTarget(null);
  }, []);

  const confirmDelete = useCallback(() => {
    const id = resolveLevelId(deleteTarget);
    if (!id) {
      toast.error("Não foi possível identificar o nível para exclusão");
      return;
    }
    dispatch(deleteLevel(id));
    closeDeleteModal();
  }, [closeDeleteModal, deleteTarget, dispatch]);

  const itemName = useMemo(
    () => deleteTarget?.[LEVEL_FIELDS.label] || deleteTarget?.name || "Este nível",
    [deleteTarget]
  );

  return {
    deleteTarget,
    itemName,
    modalOpen,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};

export default useLevelsDeletion;
