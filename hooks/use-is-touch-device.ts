import { useState, useEffect } from "react";

/**
 * Custom React hook to detect if the current device supports touch input.
 *
 * It listens to window resize events to re-check device capabilities,
 * since screen size or environment might change (e.g. rotating a tablet).
 *
 * @returns {boolean} isTouchDevice - true if the device supports touch
 */
export function useIsTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    function onResize() {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.maxTouchPoints > 0,
      );
    }

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return isTouchDevice;
}
