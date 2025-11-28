import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { OBJECTIVE_FIELDS } from "../../../../constants/objectives";
import { getObjectivesHelper } from "../../../../helpers/objectives_helper";

const sortByOrder = (items = []) =>
  [...items].sort(
    (a, b) => (Number(a?.[OBJECTIVE_FIELDS.order]) || 0) - (Number(b?.[OBJECTIVE_FIELDS.order]) || 0)
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
    [OBJECTIVE_FIELDS.order]: index + 1,
  }));

const buildBatchPayload = (items) =>
  items
    .map((item) => ({
      id: item.id || item[OBJECTIVE_FIELDS.idObjective],
      updates: { [OBJECTIVE_FIELDS.order]: item[OBJECTIVE_FIELDS.order] },
    }))
    .filter(({ id }) => Boolean(id));

const useObjectivesReorder = (objectives = [], { debounceMs = 400 } = {}) => {
  const [localObjectives, setLocalObjectives] = useState(() => sortByOrder(objectives));
  const [savingOrder, setSavingOrder] = useState(false);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const pendingObjectivesRef = useRef(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    setLocalObjectives(sortByOrder(objectives));
    setHasPendingChanges(false);
  }, [objectives]);

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
        const helper = getObjectivesHelper();
        const updates = buildBatchPayload(itemsToPersist);
        if (!updates.length) {
          setSavingOrder(false);
          setHasPendingChanges(false);
          return;
        }
        await helper.batchUpdateObjectives(updates);
        toast.success("Ordem dos objetivos atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar ordem dos objetivos:", error);
        toast.error("Não foi possível salvar a nova ordem dos objetivos");
        setLocalObjectives(sortByOrder(objectives));
      } finally {
        setSavingOrder(false);
        pendingObjectivesRef.current = null;
        setHasPendingChanges(false);
      }
    },
    [objectives]
  );

  const schedulePersist = useCallback(
    (nextObjectives) => {
      pendingObjectivesRef.current = nextObjectives;
      setHasPendingChanges(true);
      clearDebounce();
      debounceTimerRef.current = setTimeout(() => {
        debounceTimerRef.current = null;
        persistOrder(pendingObjectivesRef.current);
      }, debounceMs);
    },
    [clearDebounce, debounceMs, persistOrder]
  );

  const handleDragEnd = useCallback(
    (sourceIndex, destinationIndex) => {
      setLocalObjectives((prev) => {
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
    persistOrder(pendingObjectivesRef.current || localObjectives);
  }, [clearDebounce, localObjectives, persistOrder]);

  useEffect(() => () => clearDebounce(), [clearDebounce]);

  const metadata = useMemo(
    () => ({ savingOrder, hasPendingChanges }),
    [savingOrder, hasPendingChanges]
  );

  return {
    localObjectives,
    handleDragEnd,
    saveOrderNow,
    reorderState: metadata,
  };
};

export default useObjectivesReorder;
