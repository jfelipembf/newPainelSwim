import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteTopic } from "../../../../store/topics/actions";
import { TOPIC_FIELDS } from "../../../../constants/topics";

const resolveTopicId = (topic) => topic?.id || topic?.[TOPIC_FIELDS.idTopic];

const useTopicsDeletion = () => {
  const dispatch = useDispatch();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openDeleteModal = useCallback((topic) => {
    setDeleteTarget(topic || null);
    setModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setModalOpen(false);
    setDeleteTarget(null);
  }, []);

  const confirmDelete = useCallback(() => {
    const id = resolveTopicId(deleteTarget);
    if (!id) {
      toast.error("Não foi possível identificar o tópico para exclusão");
      return;
    }
    dispatch(deleteTopic(id));
    closeDeleteModal();
  }, [closeDeleteModal, deleteTarget, dispatch]);

  const itemName = useMemo(
    () => deleteTarget?.[TOPIC_FIELDS.name] || deleteTarget?.name || "Este tópico",
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

export default useTopicsDeletion;
