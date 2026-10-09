import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useScroll, useSpring, useTransform } from "motion/react";
import { psalm } from "../lib/content";
import { setMood } from "../lib/mood";
import { pointer } from "../lib/pointer";
import { usePrefs } from "../lib/prefs";

export function openPsalm() {
  window.dispatchEvent(new Event("psalm:open"));
}

export function Watermark139() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const x = useSpring(useTransform(pointer.x, (v) => (v / window.innerWidth - 0.5) * -30), { stiffness: 40, damping: 20 });

  return (
    <motion.div
      aria-hidden
      style={{ y, x }}
      className="pointer-events-none fixed right-[1vw] top-[40vh] z-[-1] select-none font-display text-[52vw] font-extrabold leading-none tracking-tighter text-transparent opacity-[0.045] [-webkit-text-stroke:2px_var(--foreground)] dark:opacity-[0.06] lg:text-[28vw]"
    >
      139
    </motion.div>
  );
}

const tile = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='168' height='112'>` +
    `<g font-family='JetBrains Mono, monospace' font-size='13' font-weight='500' fill='#000'>` +
    `<text x='12' y='36'>139</text><text x='96' y='92'>139</text></g></svg>`,
)}")`;

export function Pattern139() {
  const torch = useMotionTemplate`radial-gradient(260px circle at ${pointer.x}px ${pointer.y}px, #000 0%, transparent 100%)`;
  const mask = { maskImage: tile, WebkitMaskImage: tile, maskRepeat: "repeat", WebkitMaskRepeat: "repeat" } as const;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[-1]">
      <div className="absolute inset-0 bg-foreground opacity-[0.04] dark:opacity-[0.045]" style={mask} />
      <motion.div
        className="absolute inset-0 hidden lg:block"
        style={{
          WebkitMaskImage: useMotionTemplate`${tile}, ${torch}`,
          maskImage: useMotionTemplate`${tile}, ${torch}`,
          maskRepeat: "repeat, no-repeat",
          WebkitMaskRepeat: "repeat, no-repeat",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <div className="fx-mesh absolute inset-0 opacity-80" />
      </motion.div>
    </div>
  );
}

export function Psalm139() {
  const { tr, lang } = usePrefs();
  const [open, setOpen] = useState(false);
  const typed = useRef("");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, [contenteditable]")) return;
      typed.current = (typed.current + e.key).slice(-3);
      if (typed.current === "139") setOpen(true);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("psalm:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("psalm:open", onOpen);
    };
  }, []);

  useEffect(() => {
    setMood(open ? "happy" : "idle");
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    console.log(
      `%c139%c\n${psalm.verse.pt.join("\n")}\n— ${psalm.ref.pt}\n\n(${psalm.hint.pt})`,
      "font: 800 64px system-ui; color: transparent; -webkit-text-stroke: 2px #888;",
      "font: 14px system-ui; color: #888;",
    );
  }, []);

  const lines = psalm.verse[lang];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={tr(psalm.ref)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[70] grid cursor-pointer place-items-center overflow-hidden bg-background/[0.97] px-6 sm:bg-background/85 sm:backdrop-blur-xl"
        >
          <motion.div
            aria-hidden
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute size-[110vmin]"
          >
            <div className="fx-glow size-full" />
          </motion.div>

          <div className="relative max-w-3xl text-center">
            <motion.p
              initial={{ y: 40, opacity: 0, filter: "blur(12px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="fx-text font-display text-[clamp(6rem,24vw,14rem)] font-extrabold leading-none tracking-tighter"
            >
              139
            </motion.p>

            <div className="mt-6 font-display text-[clamp(1.15rem,3vw,2rem)] font-semibold leading-snug" lang={lang === "pt" ? "pt-BR" : "en"}>
              {lines.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
                  transition={{ delay: 0.6 + i * 0.45, duration: 0.7 }}
                  className={i === lines.length - 1 ? "fx-text mt-2" : i < 2 ? "text-muted" : ""}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + lines.length * 0.45 }}
              className="mt-6 font-mono text-sm uppercase tracking-[0.3em] text-muted"
            >
              — {tr(psalm.ref)}
            </motion.p>

            <button
              ref={closeRef}
              onClick={() => setOpen(false)}
              className="mt-10 rounded-full border border-separator px-5 py-2 font-mono text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
            >
              {tr(psalm.close)} · esc
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
