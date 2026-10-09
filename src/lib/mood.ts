import { useSyncExternalStore } from "react";

export type Mood = "idle" | "happy" | "surprised" | "wink";

let current: Mood = "idle";
const listeners = new Set<() => void>();

export function setMood(mood: Mood) {
  if (mood === current) return;
  current = mood;
  listeners.forEach((l) => l());
}

export function useMood() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => current,
  );
}

export function moodProps(mood: Mood) {
  return {
    onPointerEnter: () => setMood(mood),
    onPointerLeave: () => setMood("idle"),
    onFocus: () => setMood(mood),
    onBlur: () => setMood("idle"),
  };
}
