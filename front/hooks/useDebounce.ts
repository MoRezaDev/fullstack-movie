"use client";

import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
