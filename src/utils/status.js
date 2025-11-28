export const resolveIsActive = ({ isActive, inactive }) => {
  if (typeof isActive === "boolean") return isActive;
  if (typeof inactive === "boolean") return !inactive;
  return true;
};
