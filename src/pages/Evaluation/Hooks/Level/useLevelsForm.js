import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { trimOrEmpty, numberOrZero } from "../../../../utils/form";
import { LEVEL_DEFAULT_VALUES, LEVEL_FIELDS } from "../../../../constants/levels";
import { createLevel, updateLevel } from "../../../../store/levels/actions";

const useLevelsForm = (localLevels = []) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({ id: null, ...LEVEL_DEFAULT_VALUES });
  const lastHandledCreate = useRef(null);
  const lastHandledUpdate = useRef(null);

  const resetForm = useCallback(() => {
    setFormValues({ id: null, ...LEVEL_DEFAULT_VALUES });
  }, []);

  const handleChange = useCallback((field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const getNextOrder = useCallback(() => {
    if (!localLevels?.length) return 1;
    const maxOrder = localLevels.reduce(
      (max, item) => Math.max(max, Number(item?.[LEVEL_FIELDS.order]) || 0),
      0
    );
    return maxOrder + 1;
  }, [localLevels]);

  const buildPayload = useCallback(
    (values) => {
      const derivedOrder = values.id
        ? values[LEVEL_FIELDS.order] ?? getNextOrder()
        : getNextOrder();

      const payload = {
        [LEVEL_FIELDS.value]: trimOrEmpty(values[LEVEL_FIELDS.label]),
        [LEVEL_FIELDS.label]: trimOrEmpty(values[LEVEL_FIELDS.label]),
        [LEVEL_FIELDS.description]: trimOrEmpty(values[LEVEL_FIELDS.description]),
        [LEVEL_FIELDS.order]: numberOrZero(derivedOrder) || 0,
        [LEVEL_FIELDS.isActive]: Boolean(values[LEVEL_FIELDS.isActive]),
      };

      if (values.id) {
        payload[LEVEL_FIELDS.idLevel] = values[LEVEL_FIELDS.idLevel] || values.id;
      }

      return payload;
    },
    [getNextOrder]
  );

  const submit = useCallback(
    async (event) => {
      event?.preventDefault?.();

      const payload = buildPayload(formValues);
      const entityId = formValues.id;

      if (entityId) {
        dispatch(updateLevel(entityId, payload));
      } else {
        dispatch(createLevel(payload));
      }
    },
    [buildPayload, dispatch, formValues]
  );

  const handleEdit = useCallback((level) => {
    if (!level) return;

    const resolvedId = level.id || level[LEVEL_FIELDS.idLevel];
    setFormValues({
      id: resolvedId,
      ...LEVEL_DEFAULT_VALUES,
      ...level,
      [LEVEL_FIELDS.idLevel]: level[LEVEL_FIELDS.idLevel] || resolvedId,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const formState = useMemo(() => ({ formValues, isEditing: Boolean(formValues.id) }), [formValues]);

  return {
    formValues,
    formState,
    handleChange,
    handleEdit,
    resetForm,
    submit,
  };
};

export default useLevelsForm;
