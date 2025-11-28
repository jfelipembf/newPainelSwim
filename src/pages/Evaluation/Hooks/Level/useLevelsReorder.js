import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { LEVEL_FIELDS } from "../../../../constants/levels";
import { getLevelsHelper } from "../../../../helpers/levels_helper";

const sortByOrder = (items = []) =>
  [...items].sort(
    (a, b) => (Number(a?.[LEVEL_FIELDS.order]) || 0) - (Number(b?.[LEVEL_FIELDS.order]) || 0)
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
    [LEVEL_FIELDS.order]: index + 1,
  }));

const buildBatchPayload = (items) =>
  items
    .map((item) => ({
      id: item.id || item[LEVEL_FIELDS.idLevel],
      updates: { [LEVEL_FIELDS.order]: item[LEVEL_FIELDS.order] },
    }))
    .filter(({ id }) => Boolean(id));

const useLevelsReorder = (levels = [], { debounceMs = 400 } = {}) => {
  const [localLevels, setLocalLevels] = useState(() => sortByOrder(levels));
  const [savingOrder, setSavingOrder] = useState(false);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const pendingLevelsRef = useRef(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    setLocalLevels(sortByOrder(levels));
    setHasPendingChanges(false);
  }, [levels]);

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
        const helper = getLevelsHelper();
        const updates = buildBatchPayload(itemsToPersist);
        if (!updates.length) {
          setSavingOrder(false);
          setHasPendingChanges(false);
          return;
        }
        await helper.batchUpdateLevels(updates);
        toast.success("Ordem dos níveis atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar ordem dos níveis:", error);
        toast.error("Não foi possível salvar a nova ordem dos níveis");
        setLocalLevels(sortByOrder(levels));
      } finally {
        setSavingOrder(false);
        pendingLevelsRef.current = null;
        setHasPendingChanges(false);
      }
    },
    [levels]
  );

  const schedulePersist = useCallback(
    (nextLevels) => {
      pendingLevelsRef.current = nextLevels;
      setHasPendingChanges(true);
      clearDebounce();
      debounceTimerRef.current = setTimeout(() => {
        debounceTimerRef.current = null;
        persistOrder(pendingLevelsRef.current);
      }, debounceMs);
    },
    [clearDebounce, debounceMs, persistOrder]
  );

  const handleDragEnd = useCallback(
    (sourceIndex, destinationIndex) => {
      setLocalLevels((prev) => {
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
    persistOrder(pendingLevelsRef.current || localLevels);
  }, [clearDebounce, localLevels, persistOrder]);

  useEffect(() => () => clearDebounce(), [clearDebounce]);

  const metadata = useMemo(
    () => ({ savingOrder, hasPendingChanges }),
    [savingOrder, hasPendingChanges]
  );

  return {
    localLevels,
    handleDragEnd,
    saveOrderNow,
    reorderState: metadata,
  };
};

export default useLevelsReorder;
