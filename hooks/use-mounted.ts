import { useState, useEffect } from "react";

/**
 * Custom React hook to check if the component is mounted on the client.
 *
 * Useful when you need to:
 * - Avoid hydration mismatch in Next.js / SSR
 * - Run code only after the component is mounted
 *
 * @returns {boolean} mounted - true if the component has mounted, false otherwise
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
