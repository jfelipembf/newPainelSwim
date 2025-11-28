import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { TOPIC_FIELDS } from "../../../../constants/topics";
import { getTopicsHelper } from "../../../../helpers/topics_helper";

const sortByOrder = (items = []) =>
  [...items].sort(
    (a, b) => (Number(a?.[TOPIC_FIELDS.order]) || 0) - (Number(b?.[TOPIC_FIELDS.order]) || 0)
  );

const reorderList = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const patchOrderValues = (items) =>
  items.map((item, index) => ({
    ...item,
    [TOPIC_FIELDS.order]: index + 1,
  }));

const buildBatchPayload = (items) =>
  items
    .map((item) => ({
      id: item.id || item[TOPIC_FIELDS.idTopic],
      updates: { [TOPIC_FIELDS.order]: item[TOPIC_FIELDS.order] },
    }))
    .filter(({ id }) => Boolean(id));

const useTopicsReorder = (topics = [], { debounceMs = 400 } = {}) => {
  const [localTopics, setLocalTopics] = useState(() => sortByOrder(topics));
  const [savingOrder, setSavingOrder] = useState(false);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const pendingTopicsRef = useRef(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    setLocalTopics(sortByOrder(topics));
    setHasPendingChanges(false);
  }, [topics]);

  const clearDebounce = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
  }, []);

  const persistOrder = useCallback(
    async (itemsToPersist) => {
      if (!itemsToPersist || !itemsToPersist.length) return;

      setSavingOrder(true);
      try {
        const helper = getTopicsHelper();
        const updates = buildBatchPayload(itemsToPersist);
        if (!updates.length) {
          setSavingOrder(false);
          setHasPendingChanges(false);
          return;
        }
        await helper.batchUpdateTopics(updates);
        toast.success("Ordem dos tópicos atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar ordem dos tópicos:", error);
        toast.error("Não foi possível salvar a nova ordem dos tópicos");
        setLocalTopics(sortByOrder(topics));
      } finally {
        setSavingOrder(false);
        pendingTopicsRef.current = null;
        setHasPendingChanges(false);
      }
    },
    [topics]
  );

  const schedulePersist = useCallback(
    (nextTopics) => {
      pendingTopicsRef.current = nextTopics;
      setHasPendingChanges(true);
      clearDebounce();
      debounceTimerRef.current = setTimeout(() => {
        debounceTimerRef.current = null;
        persistOrder(pendingTopicsRef.current);
      }, debounceMs);
    },
    [clearDebounce, debounceMs, persistOrder]
  );

  const handleDragEnd = useCallback(
    (sourceIndex, destinationIndex) => {
      setLocalTopics((prev) => {
        const reordered = reorderList(prev, sourceIndex, destinationIndex);
        const patched = patchOrderValues(reordered);
        schedulePersist(patched);
        return patched;
      });
    },
    [schedulePersist]
  );

  const saveOrderNow = useCallback(() => {
    clearDebounce();
    persistOrder(pendingTopicsRef.current || localTopics);
  }, [clearDebounce, localTopics, persistOrder]);

  useEffect(() => () => clearDebounce(), [clearDebounce]);

  const metadata = useMemo(
    () => ({ savingOrder, hasPendingChanges }),
    [savingOrder, hasPendingChanges]
  );

  return {
    localTopics,
    handleDragEnd,
    saveOrderNow,
    reorderState: metadata,
  };
};

export default useTopicsReorder;
