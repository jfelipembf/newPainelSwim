import { useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";

const DEFAULT_MESSAGES = {
  created: "Objetivo criado com sucesso!",
  updated: "Objetivo atualizado com sucesso!",
  deleted: "Objetivo excluído com sucesso!",
};

const useObjectivesFeedback = ({
  resolveId,
  createdObjective,
  updatedObjective,
  deletedObjectiveId,
  fireCreated,
  fireUpdated,
  fireDeleted,
  onReset,
  errors,
  messages,
}) => {
  const handledCreateRef = useRef(null);
  const handledUpdateRef = useRef(null);
  const handledDeleteRef = useRef(null);

  const composedMessages = { ...DEFAULT_MESSAGES, ...(messages || {}) };
  const errorList = useMemo(() => errors || [], [errors]);

  useEffect(() => {
    if (!createdObjective || handledCreateRef.current === createdObjective) return;

    handledCreateRef.current = createdObjective;
    const createdId = resolveId?.(createdObjective);
    if (!createdId) return;

    fireCreated?.(createdId, () => toast.success(composedMessages.created));
    onReset?.();
  }, [createdObjective, fireCreated, composedMessages.created, onReset, resolveId]);

  useEffect(() => {
    if (!updatedObjective || handledUpdateRef.current === updatedObjective) return;

    handledUpdateRef.current = updatedObjective;
    const updatedId = resolveId?.(updatedObjective);
    if (!updatedId) return;

    fireUpdated?.(updatedId, () => toast.success(composedMessages.updated));
    onReset?.();
  }, [updatedObjective, fireUpdated, composedMessages.updated, onReset, resolveId]);

  useEffect(() => {
    if (!deletedObjectiveId || handledDeleteRef.current === deletedObjectiveId) return;

    handledDeleteRef.current = deletedObjectiveId;
    fireDeleted?.(deletedObjectiveId, () => toast.success(composedMessages.deleted));
  }, [deletedObjectiveId, fireDeleted, composedMessages.deleted]);

  useEffect(() => {
    const firstError = errorList.find(Boolean);
    if (firstError) {
      toast.error(firstError);
    }
  }, [errorList]);
};

export default useObjectivesFeedback;
