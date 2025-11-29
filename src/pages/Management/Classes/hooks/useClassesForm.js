import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { ACTIVITY_CONFIG_DEFAULT_VALUES, ACTIVITY_CONFIG_FIELDS } from "../../../../constants/activities/activities_configs";
import { createConfig, updateConfig } from "../../../../store/activities_schedule/actions";

const sanitizeNumber = (value) => Number(value || 0);

const parseDurationToMinutes = (value) => {
  if (!value && value !== 0) return 0;
  if (typeof value === "number") return value;
  if (typeof value !== "string") return Number(value) || 0;
  const [hours = "0", minutes = "0"] = value.split(":");
  return Number(hours) * 60 + Number(minutes);
};

export const useClassesForm = ({ photoUpload } = {}) => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({ ...ACTIVITY_CONFIG_DEFAULT_VALUES });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSelectActivity = useCallback((option) => {
    setFormValues((prev) => {
      const nextValues = {
        ...prev,
        [ACTIVITY_CONFIG_FIELDS.idActivity]: option?.value || "",
        [ACTIVITY_CONFIG_FIELDS.activityName]: option?.label || "",
        [ACTIVITY_CONFIG_FIELDS.activityColor]: option?.raw?.color || "",
      };

      const activityRaw = option?.raw;
      if (activityRaw) {
        if (activityRaw.capacityDefault !== undefined && activityRaw.capacityDefault !== null) {
          nextValues[ACTIVITY_CONFIG_FIELDS.capacity] = Number(activityRaw.capacityDefault) || 0;
        }
        if (activityRaw.durationDefault !== undefined && activityRaw.durationDefault !== null) {
          nextValues[ACTIVITY_CONFIG_FIELDS.duration] = parseDurationToMinutes(activityRaw.durationDefault);
        }
      }

      return nextValues;
    });
  }, []);

  const handleSelectArea = useCallback((option) => {
    setFormValues((prev) => ({
      ...prev,
      [ACTIVITY_CONFIG_FIELDS.idArea]: option?.value || "",
      [ACTIVITY_CONFIG_FIELDS.areaName]: option?.label || "",
    }));
  }, []);

  const handleSelectInstructor = useCallback((option) => {
    setFormValues((prev) => ({
      ...prev,
      [ACTIVITY_CONFIG_FIELDS.idInstructor]: option?.value || "",
      [ACTIVITY_CONFIG_FIELDS.instructorName]: option?.label || "",
    }));
  }, []);

  const handleDaysChange = useCallback((days) => {
    setFormValues((prev) => ({ ...prev, [ACTIVITY_CONFIG_FIELDS.daysOfWeek]: days }));
  }, []);

  const isValid = useMemo(() => {
    return (
      !!formValues[ACTIVITY_CONFIG_FIELDS.idActivity] &&
      !!formValues[ACTIVITY_CONFIG_FIELDS.idArea] &&
      !!formValues[ACTIVITY_CONFIG_FIELDS.idInstructor] &&
      !!formValues[ACTIVITY_CONFIG_FIELDS.startDate] &&
      !!formValues[ACTIVITY_CONFIG_FIELDS.startTime] &&
      formValues[ACTIVITY_CONFIG_FIELDS.daysOfWeek]?.length > 0
    );
  }, [formValues]);

  const handleSubmit = useCallback(async () => {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);

    const basePayload = {
      ...formValues,
      [ACTIVITY_CONFIG_FIELDS.capacity]: sanitizeNumber(formValues[ACTIVITY_CONFIG_FIELDS.capacity]),
      [ACTIVITY_CONFIG_FIELDS.duration]: sanitizeNumber(formValues[ACTIVITY_CONFIG_FIELDS.duration]),
    };

    if (!basePayload[ACTIVITY_CONFIG_FIELDS.endDate]) {
      delete basePayload[ACTIVITY_CONFIG_FIELDS.endDate];
    }

    const selectedDays = basePayload[ACTIVITY_CONFIG_FIELDS.daysOfWeek] || [];

    if (editingId) {
      dispatch(updateConfig(editingId, basePayload));
      return;
    }

    if (selectedDays.length > 1) {
      selectedDays.forEach((day) => {
        const payload = {
          ...basePayload,
          [ACTIVITY_CONFIG_FIELDS.daysOfWeek]: [day],
        };
        dispatch(createConfig(payload));
      });
      setIsSubmitting(false);
      return;
    }

    dispatch(createConfig(basePayload));
  }, [dispatch, editingId, formValues, isSubmitting, isValid]);

  const handleEdit = useCallback((config) => {
    if (!config) return;
    setEditingId(config.id || config[ACTIVITY_CONFIG_FIELDS.idConfiguration]);
    setFormValues({
      ...ACTIVITY_CONFIG_DEFAULT_VALUES,
      ...config,
      [ACTIVITY_CONFIG_FIELDS.activityColor]:
        config[ACTIVITY_CONFIG_FIELDS.activityColor] || config.activityColor || "",
      [ACTIVITY_CONFIG_FIELDS.idInstructor]:
        config[ACTIVITY_CONFIG_FIELDS.idInstructor] || config.instructorId || "",
    });
  }, []);

  const handleCancel = useCallback(() => {
    setEditingId(null);
    setFormValues({ ...ACTIVITY_CONFIG_DEFAULT_VALUES });
    setIsSubmitting(false);
  }, []);

  return {
    formValues,
    editingId,
    isSubmitting,
    isValid,
    handleChange,
    handleSelectActivity,
    handleSelectArea,
    handleSelectInstructor,
    handleDaysChange,
    handleSubmit,
    handleCancel,
    handleEdit,
    setIsSubmitting,
  };
};

export default useClassesForm;
