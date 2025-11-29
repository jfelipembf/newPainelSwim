import { useMemo } from "react";

export const useBusy = (...flags) => {
  return useMemo(() => flags.some(Boolean), [flags]);
};
