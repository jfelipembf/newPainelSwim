import { useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";

const DEFAULT_MESSAGES = {
  created: "Tópico criado com sucesso!",
  updated: "Tópico atualizado com sucesso!",
  deleted: "Tópico excluído com sucesso!",
};

const useTopicsFeedback = ({
  resolveId,
  createdTopic,
  updatedTopic,
  deletedTopicId,
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
    if (!createdTopic || handledCreateRef.current === createdTopic) return;

    handledCreateRef.current = createdTopic;
    const createdId = resolveId?.(createdTopic);
    if (!createdId) return;

    fireCreated?.(createdId, () => toast.success(composedMessages.created));
    onReset?.();
  }, [createdTopic, fireCreated, composedMessages.created, onReset, resolveId]);

  useEffect(() => {
    if (!updatedTopic || handledUpdateRef.current === updatedTopic) return;

    handledUpdateRef.current = updatedTopic;
    const updatedId = resolveId?.(updatedTopic);
    if (!updatedId) return;

    fireUpdated?.(updatedId, () => toast.success(composedMessages.updated));
    onReset?.();
  }, [updatedTopic, fireUpdated, composedMessages.updated, onReset, resolveId]);

  useEffect(() => {
    if (!deletedTopicId || handledDeleteRef.current === deletedTopicId) return;

    handledDeleteRef.current = deletedTopicId;
    fireDeleted?.(deletedTopicId, () => toast.success(composedMessages.deleted));
  }, [deletedTopicId, fireDeleted, composedMessages.deleted]);

  useEffect(() => {
    const firstError = errorList.find(Boolean);
    if (firstError) {
      toast.error(firstError);
    }
  }, [errorList]);
};

export default useTopicsFeedback;
