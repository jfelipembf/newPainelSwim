import { useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";

const DEFAULT_MESSAGES = {
  created: "Nível criado com sucesso!",
  updated: "Nível atualizado com sucesso!",
  deleted: "Nível excluído com sucesso!",
};

const useLevelsFeedback = ({
  resolveId,
  createdLevel,
  updatedLevel,
  deletedLevelId,
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
    if (!createdLevel || handledCreateRef.current === createdLevel) return;

    handledCreateRef.current = createdLevel;
    const createdId = resolveId?.(createdLevel);
    if (!createdId) return;

    fireCreated?.(createdId, () => toast.success(composedMessages.created));
    onReset?.();
  }, [createdLevel, fireCreated, composedMessages.created, onReset, resolveId]);

  useEffect(() => {
    if (!updatedLevel || handledUpdateRef.current === updatedLevel) return;

    handledUpdateRef.current = updatedLevel;
    const updatedId = resolveId?.(updatedLevel);
    if (!updatedId) return;

    fireUpdated?.(updatedId, () => toast.success(composedMessages.updated));
    onReset?.();
  }, [updatedLevel, fireUpdated, composedMessages.updated, onReset, resolveId]);

  useEffect(() => {
    if (!deletedLevelId || handledDeleteRef.current === deletedLevelId) return;

    handledDeleteRef.current = deletedLevelId;
    fireDeleted?.(deletedLevelId, () => toast.success(composedMessages.deleted));
  }, [deletedLevelId, fireDeleted, composedMessages.deleted]);

  useEffect(() => {
    const firstError = errorList.find(Boolean);
    if (firstError) {
      toast.error(firstError);
    }
  }, [errorList]);
};

export default useLevelsFeedback;
