import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { trimOrEmpty, numberOrZero } from "../../../../utils/form";
import { OBJECTIVE_DEFAULT_VALUES, OBJECTIVE_FIELDS } from "../../../../constants/objectives";
import { createObjective, updateObjective } from "../../../../store/objectives/actions";

const useObjectivesForm = (localObjectives = []) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({ id: null, ...OBJECTIVE_DEFAULT_VALUES });

  const resetForm = useCallback(() => {
    setFormValues({ id: null, ...OBJECTIVE_DEFAULT_VALUES });
  }, []);

  const handleChange = useCallback((field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const getNextOrder = useCallback(() => {
    if (!localObjectives?.length) return 1;
    const maxOrder = localObjectives.reduce(
      (max, item) => Math.max(max, Number(item?.[OBJECTIVE_FIELDS.order]) || 0),
      0
    );
    return maxOrder + 1;
  }, [localObjectives]);

  const buildPayload = useCallback(
    (values) => {
      const derivedOrder = values.id
        ? values[OBJECTIVE_FIELDS.order] ?? getNextOrder()
        : getNextOrder();

      const payload = {
        [OBJECTIVE_FIELDS.name]: trimOrEmpty(values[OBJECTIVE_FIELDS.name]),
        [OBJECTIVE_FIELDS.description]: trimOrEmpty(values[OBJECTIVE_FIELDS.description]),
        [OBJECTIVE_FIELDS.order]: numberOrZero(derivedOrder) || 0,
        [OBJECTIVE_FIELDS.idActivity]: trimOrEmpty(values[OBJECTIVE_FIELDS.idActivity]),
        [OBJECTIVE_FIELDS.isActive]: Boolean(values[OBJECTIVE_FIELDS.isActive]),
      };

      if (values.id) {
        payload[OBJECTIVE_FIELDS.idObjective] = values[OBJECTIVE_FIELDS.idObjective] || values.id;
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
        dispatch(updateObjective(entityId, payload));
      } else {
        dispatch(createObjective(payload));
      }
    },
    [buildPayload, dispatch, formValues]
  );

  const handleEdit = useCallback((objective) => {
    if (!objective) return;

    const resolvedId = objective.id || objective[OBJECTIVE_FIELDS.idObjective];
    setFormValues({
      id: resolvedId,
      ...OBJECTIVE_DEFAULT_VALUES,
      ...objective,
      [OBJECTIVE_FIELDS.idObjective]: objective[OBJECTIVE_FIELDS.idObjective] || resolvedId,
      [OBJECTIVE_FIELDS.order]:
        objective[OBJECTIVE_FIELDS.order] || objective.order || getNextOrder(),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [getNextOrder]);

  const formState = useMemo(
    () => ({ formValues, isEditing: Boolean(formValues.id) }),
    [formValues]
  );

  return {
    formValues,
    formState,
    handleChange,
    handleEdit,
    resetForm,
    submit,
  };
};

export default useObjectivesForm;
