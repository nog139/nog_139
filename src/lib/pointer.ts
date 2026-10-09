import { motionValue } from "motion/react";

export const pointer = {
  x: motionValue(typeof window === "undefined" ? 0 : window.innerWidth / 2),
  y: motionValue(typeof window === "undefined" ? 0 : window.innerHeight / 3),
};

if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x.set(e.clientX);
      pointer.y.set(e.clientY);
    },
    { passive: true },
  );
}
