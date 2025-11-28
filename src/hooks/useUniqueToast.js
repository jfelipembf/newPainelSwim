import { useRef, useCallback } from "react";

export const useUniqueToast = () => {
  const lastIdRef = useRef(null);

  const fire = useCallback((id, cb) => {
    if (!id || id === lastIdRef.current) return false;
    lastIdRef.current = id;
    cb?.();
    return true;
  }, []);

  const reset = useCallback(() => {
    lastIdRef.current = null;
  }, []);

  return { fire, reset };
};
