import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { trimOrEmpty, numberOrZero } from "../../../../utils/form";
import { TOPIC_DEFAULT_VALUES, TOPIC_FIELDS } from "../../../../constants/topics";
import { createTopic, updateTopic } from "../../../../store/topics/actions";

const useTopicsForm = (localTopics = []) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({ id: null, ...TOPIC_DEFAULT_VALUES });

  const resetForm = useCallback(() => {
    setFormValues({ id: null, ...TOPIC_DEFAULT_VALUES });
  }, []);

  const handleChange = useCallback((field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const getNextOrder = useCallback(() => {
    if (!localTopics?.length) return 1;
    const maxOrder = localTopics.reduce(
      (max, item) => Math.max(max, Number(item?.[TOPIC_FIELDS.order]) || 0),
      0
    );
    return maxOrder + 1;
  }, [localTopics]);

  const buildPayload = useCallback(
    (values) => {
      const derivedOrder = values.id
        ? values[TOPIC_FIELDS.order] ?? getNextOrder()
        : getNextOrder();

      const payload = {
        [TOPIC_FIELDS.name]: trimOrEmpty(values[TOPIC_FIELDS.name]),
        [TOPIC_FIELDS.description]: trimOrEmpty(values[TOPIC_FIELDS.description]),
        [TOPIC_FIELDS.order]: numberOrZero(derivedOrder) || 0,
        [TOPIC_FIELDS.idObjective]: values[TOPIC_FIELDS.idObjective],
        [TOPIC_FIELDS.isActive]: Boolean(values[TOPIC_FIELDS.isActive]),
      };

      if (values.id) {
        payload[TOPIC_FIELDS.idTopic] = values[TOPIC_FIELDS.idTopic] || values.id;
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
        dispatch(updateTopic(entityId, payload));
      } else {
        dispatch(createTopic(payload));
      }
    },
    [buildPayload, dispatch, formValues]
  );

  const handleEdit = useCallback(
    (topic) => {
      if (!topic) return;

      const resolvedId = topic.id || topic[TOPIC_FIELDS.idTopic];
      setFormValues({
        id: resolvedId,
        ...TOPIC_DEFAULT_VALUES,
        ...topic,
        [TOPIC_FIELDS.idTopic]: topic[TOPIC_FIELDS.idTopic] || resolvedId,
        [TOPIC_FIELDS.order]: topic[TOPIC_FIELDS.order] || topic.order || getNextOrder(),
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [getNextOrder]
  );

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

export default useTopicsForm;
