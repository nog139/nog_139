import { motion, useMotionTemplate, useTransform } from "motion/react";
import { pointer } from "../lib/pointer";

export function Spotlight() {
  const hue = useTransform(pointer.x, (x) => 20 + (x / window.innerWidth) * 300);
  const background = useMotionTemplate`radial-gradient(600px circle at ${pointer.x}px ${pointer.y}px, oklch(0.72 0.19 ${hue} / var(--fx-alpha)), transparent 80%)`;
  return <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-30 hidden lg:block" style={{ background }} />;
}
