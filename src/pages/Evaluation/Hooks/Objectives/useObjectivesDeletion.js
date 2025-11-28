import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteObjective } from "../../../../store/objectives/actions";
import { OBJECTIVE_FIELDS } from "../../../../constants/objectives";

const resolveObjectiveId = (objective) => objective?.id || objective?.[OBJECTIVE_FIELDS.idObjective];

const useObjectivesDeletion = () => {
  const dispatch = useDispatch();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openDeleteModal = useCallback((objective) => {
    setDeleteTarget(objective || null);
    setModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setModalOpen(false);
    setDeleteTarget(null);
  }, []);

  const confirmDelete = useCallback(() => {
    const id = resolveObjectiveId(deleteTarget);
    if (!id) {
      toast.error("Não foi possível identificar o objetivo para exclusão");
      return;
    }
    dispatch(deleteObjective(id));
    closeDeleteModal();
  }, [closeDeleteModal, deleteTarget, dispatch]);

  const itemName = useMemo(
    () => deleteTarget?.[OBJECTIVE_FIELDS.name] || deleteTarget?.name || "Este objetivo",
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

export default useObjectivesDeletion;
