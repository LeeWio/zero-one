import { useState, useEffect } from "react";

/**
 * Custom React hook for debouncing a value.
 *
 * Debouncing means: wait for a certain delay after the last change
 * before updating the value. Useful for search inputs, API calls, etc.
 *
 * @param value - The input value to debounce
 * @param delay - Delay time in milliseconds (default = 500ms)
 * @returns The debounced value
 */
export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(() => value);

  useEffect(() => {
    const handler: ReturnType<typeof setTimeout> = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
