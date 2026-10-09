import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { t } from "../lib/content";
import { usePrefs } from "../lib/prefs";

function Word({ word, glow, progress, range }: { word: string; glow: boolean; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const filter = useTransform(progress, range, ["blur(6px)", "blur(0px)"]);
  return (
    <motion.span style={{ opacity, filter }} className={`inline-block ${glow ? "fx-text" : ""}`}>
      {word}&nbsp;
    </motion.span>
  );
}

export function Statement() {
  const { tr } = usePrefs();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  const text = tr(t.statement.text);
  const glow = tr(t.statement.glow);
  const words = text.split(" ");
  const glowStart = words.length - glow.split(" ").length;

  return (
    <section className="relative mx-auto max-w-5xl px-4 py-32 text-center sm:px-8 sm:py-48">
      <div aria-hidden className="fx-aura absolute left-1/2 top-1/2 size-[50vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-[100px]" />
      <p ref={ref} className="relative font-display text-[clamp(2rem,6vw,4.75rem)] font-bold leading-[1.05] tracking-tighter">
        {words.map((w, i) => (
          <Word key={i} word={w} glow={i >= glowStart} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>
    </section>
  );
}
