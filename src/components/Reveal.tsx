import type { ReactNode } from "react";
import { motion } from "motion/react";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ index, children }: { index: string; children: ReactNode }) {
  return (
    <Reveal>
      <p className="mb-4 flex items-center gap-3 font-mono text-xs text-muted">
        <span className="fx-text">{index}</span>
        <span className="h-px w-12 bg-separator" />
      </p>
      <h2 className="mb-12 font-display text-4xl font-bold tracking-tighter sm:text-6xl">{children}</h2>
    </Reveal>
  );
}

export function Words({ text, className, delay = 0, after }: { text: string; className?: string; delay?: number; after?: ReactNode }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
          viewport={{ once: true }}
          transition={{ delay: delay + i * 0.06, duration: 0.6 }}
        >
          {w}
          {i < words.length - 1 ? "\u00a0" : after}
        </motion.span>
      ))}
    </span>
  );
}
