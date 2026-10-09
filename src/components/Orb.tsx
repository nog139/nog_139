import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { pointer } from "../lib/pointer";
import { setMood, useMood, type Mood } from "../lib/mood";
import { usePrefs } from "../lib/prefs";

const SPRING = { stiffness: 110, damping: 16, mass: 0.6 };
const INK = "#0a0a0a";

const greetings = {
  pt: ["Oi! 👋", "Bora codar?", "Ei, isso faz cócegas!", "Me contrata? 😄", "Feito em tempo real ⚡", "Sl 139 ✦ digite 1·3·9"],
  en: ["Hey! 👋", "Let's build?", "Hey, that tickles!", "Hire me? 😄", "Built in real time ⚡", "Ps 139 ✦ type 1·3·9"],
};

function clamp(v: number) {
  return Math.max(-1, Math.min(1, v));
}

function useLook(ref: React.RefObject<HTMLDivElement | null>) {
  const center = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const measure = () => {
      const r = ref.current?.getBoundingClientRect();
      if (r) center.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [ref]);

  const x = useTransform(pointer.x, (v) => clamp((v - center.current.x) / (window.innerWidth * 0.4)));
  const y = useTransform(pointer.y, (v) => clamp((v - center.current.y) / (window.innerHeight * 0.45)));
  return { x: useSpring(x, SPRING), y: useSpring(y, SPRING) };
}

function useBlink() {
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    let timer: number;
    const loop = () => {
      timer = window.setTimeout(() => {
        setClosed(true);
        window.setTimeout(() => setClosed(false), 120);
        loop();
      }, 2400 + Math.random() * 3200);
    };
    loop();
    return () => window.clearTimeout(timer);
  }, []);
  return closed;
}

function Eye({ cx, mood, closed }: { cx: number; mood: Mood; closed: boolean }) {
  if (mood === "happy" || (mood === "wink" && cx > 50)) {
    return (
      <path
        d={`M${cx - 6} 49 Q${cx} 39 ${cx + 6} 49`}
        fill="none"
        stroke={INK}
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    );
  }

  const surprised = mood === "surprised";
  return (
    <motion.g animate={{ scaleY: closed ? 0.1 : 1 }} transition={{ duration: 0.08 }}>
      {surprised ? (
        <circle cx={cx} cy="46" r="6.5" fill={INK} />
      ) : (
        <rect x={cx - 4.5} y="36" width="9" height="20" rx="4.5" fill={INK} />
      )}
      <circle cx={cx + 1.6} cy={surprised ? 43.5 : 40.5} r="1.7" fill="#fff" />
    </motion.g>
  );
}

function Mouth({ mood }: { mood: Mood }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {mood === "surprised" ? (
        <motion.ellipse key="o" cx="50" cy="63" rx="3" ry="3.8" fill={INK} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} />
      ) : (
        <motion.path
          key={mood === "idle" ? "idle" : "smile"}
          d={mood === "idle" ? "M46 61 Q50 64 54 61" : "M42 59 Q50 69 58 59"}
          fill="none"
          stroke={INK}
          strokeWidth={mood === "idle" ? 2.4 : 3.2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />
      )}
    </AnimatePresence>
  );
}

export function Orb({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduce = useReducedMotion();
  const mood = useMood();
  const blink = useBlink();
  const { lang } = usePrefs();
  const [bubble, setBubble] = useState<string | null>(null);
  const pokes = useRef(0);

  const look = useLook(ref);
  const still = useMotionValue(0);
  const nx = reduce ? still : look.x;
  const ny = reduce ? still : look.y;

  const rotateY = useTransform(nx, (v) => v * 20);
  const rotateX = useTransform(ny, (v) => v * -16);
  const faceX = useTransform(nx, (v) => v * 15);
  const faceY = useTransform(ny, (v) => v * 11);
  const shineX = useTransform(nx, (v) => `${32 - v * 14}%`);
  const shineY = useTransform(ny, (v) => `${26 - v * 12}%`);
  const shine = useMotionTemplate`radial-gradient(circle at ${shineX} ${shineY}, rgb(255 255 255 / 0.6), rgb(255 255 255 / 0) 36%)`;

  const poke = () => {
    const list = greetings[lang];
    setBubble(list[pokes.current++ % list.length]);
    setMood("surprised");
    window.setTimeout(() => setMood("idle"), 700);
    if (!reduce) {
      animate(scope.current, { scaleX: [1, 1.14, 0.94, 1.03, 1], scaleY: [1, 0.86, 1.06, 0.98, 1] }, { duration: 0.6 });
    }
  };

  useEffect(() => {
    if (!bubble) return;
    const id = window.setTimeout(() => setBubble(null), 2200);
    return () => window.clearTimeout(id);
  }, [bubble]);

  return (
    <div ref={ref} className={`relative aspect-square ${className ?? ""}`}>
      <motion.div
        aria-hidden
        className="fx-aura absolute inset-[8%] rounded-full blur-3xl"
        animate={{ opacity: mood === "happy" ? 0.75 : 0.45, scale: mood === "happy" ? 1.12 : 1 }}
        transition={{ duration: 0.6 }}
      />

      <AnimatePresence>
        {bubble && (
          <motion.div
            key={bubble}
            initial={{ opacity: 0, y: 10, scale: 0.8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, scale: 0.9, filter: "blur(6px)" }}
            className="absolute right-[2%] top-[4%] z-10 rounded-2xl rounded-bl-sm border border-separator bg-background/70 px-4 py-2 font-display text-sm font-semibold shadow-lg backdrop-blur-md"
            role="status"
          >
            {bubble}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={poke}
        aria-label={lang === "pt" ? "Uma aura que acompanha o cursor com o olhar" : "An aura that follows your cursor with its eyes"}
        className="absolute inset-[16%] cursor-pointer outline-none [perspective:900px] focus-visible:ring-2 focus-visible:ring-focus"
        style={{ borderRadius: "50%" }}
        animate={{ scale: mood === "surprised" ? 1.05 : 1 }}
      >
        <motion.div ref={scope} className="relative size-full" style={{ rotateX, rotateY }}>
          <div className="animate-blob absolute inset-0 overflow-hidden shadow-[inset_0_-24px_60px_rgb(0_0_0/0.35)]">
            <div className="fx-aura absolute inset-[-35%] blur-2xl" />
            <div className="fx-aura absolute inset-[20%] rotate-180 rounded-full opacity-60 mix-blend-overlay blur-xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgb(0_0_0/0.35),transparent_60%)]" />
            <motion.div className="absolute inset-0" style={{ background: shine }} />
            <motion.svg viewBox="0 0 100 100" className="absolute inset-0 size-full" style={{ x: faceX, y: faceY }} aria-hidden>
              <AnimatePresence>
                {mood === "happy" && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ellipse cx="29" cy="57" rx="6" ry="3.5" fill="#ff6b8b" opacity="0.45" />
                    <ellipse cx="71" cy="57" rx="6" ry="3.5" fill="#ff6b8b" opacity="0.45" />
                  </motion.g>
                )}
              </AnimatePresence>
              <Eye cx={38} mood={mood} closed={blink} />
              <Eye cx={62} mood={mood} closed={blink} />
              <Mouth mood={mood} />
            </motion.svg>
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
}
