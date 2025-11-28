export const trimOrEmpty = (value) => (value || "").toString().trim();

export const numberOrZero = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};
