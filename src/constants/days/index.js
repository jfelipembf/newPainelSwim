export const WEEK_DAYS = [
  { value: 0, id: "dom", label: "Domingo", short: "Dom", alt: "Do" },
  { value: 1, id: "seg", label: "Segunda-feira", short: "Seg", alt: "2ª" },
  { value: 2, id: "ter", label: "Terça-feira", short: "Ter", alt: "3ª" },
  { value: 3, id: "qua", label: "Quarta-feira", short: "Qua", alt: "4ª" },
  { value: 4, id: "qui", label: "Quinta-feira", short: "Qui", alt: "5ª" },
  { value: 5, id: "sex", label: "Sexta-feira", short: "Sex", alt: "6ª" },
  { value: 6, id: "sab", label: "Sábado", short: "Sáb", alt: "Sá" },
];

export const WEEK_DAY_MAP = WEEK_DAYS.reduce(
  (acc, day) => ({
    ...acc,
    [day.value]: day,
  }),
  {}
);

export const WEEK_DAY_ID_BY_VALUE = WEEK_DAYS.reduce(
  (acc, day) => ({
    ...acc,
    [day.value]: day.id,
  }),
  {}
);

export const WEEK_DAY_LABELS = WEEK_DAYS.reduce(
  (acc, day) => ({ ...acc, [day.value]: day.label }),
  {}
);

export const WEEK_DAY_SHORT_LABELS = WEEK_DAYS.reduce(
  (acc, day) => ({ ...acc, [day.value]: day.short }),
  {}
);

export const WEEK_DAY_ALTERNATE_LABELS = WEEK_DAYS.reduce(
  (acc, day) => ({ ...acc, [day.value]: day.alt }),
  {}
);
