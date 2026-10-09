import { motion, useScroll, useTransform } from "motion/react";
import { Button, Chip } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { profile, t } from "../lib/content";
import { moodProps } from "../lib/mood";
import { usePrefs } from "../lib/prefs";
import { Highlight } from "./Highlight";
import { Magnetic } from "./Magnetic";
import { Orb } from "./Orb";

function Bouncy({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "40%", opacity: 0, filter: "blur(14px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
          transition={{ delay: 0.15 + i * 0.035, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -14, rotate: i % 2 ? 6 : -6, transition: { type: "spring", stiffness: 400, damping: 8 } }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

const ring = "SOFTWARE ENGINEER • FRONT-END • FULL STACK • iGAMING • FINTECH • ";

export function Hero() {
  const { tr } = usePrefs();
  const { scrollY } = useScroll();
  const avatarY = useTransform(scrollY, [0, 600], [0, 80]);
  const textY = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <section className="relative mx-auto grid min-h-svh max-w-6xl items-center gap-8 px-4 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:pt-20">
      <motion.div style={{ y: textY }} className="order-2 lg:order-1">
        <motion.p
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
          className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-muted"
        >
          {tr(t.hero.hello)}
        </motion.p>

        <h1 className="font-display text-[clamp(3rem,11vw,7.5rem)] font-extrabold leading-[0.88] tracking-tighter">
          <span className="block pb-2">
            <Bouncy text="Vinícius" />
          </span>
          <span className="block pb-2">
            <Bouncy text="Nogueira" className="text-outline" />
            <span className="fx-text">.</span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="mt-6 font-display text-2xl font-semibold text-muted sm:text-3xl">{tr(t.hero.role)}</p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            <Highlight text={tr(t.hero.tagline)} glow={tr(t.hero.taglineGlow)} />
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href={`mailto:${profile.email}`} {...moodProps("happy")}>
                <Button variant="primary" size="lg" className="pointer-events-none rounded-full px-7 font-semibold">
                  {tr(t.hero.cta)} →
                </Button>
              </a>
            </Magnetic>
            <Magnetic>
              <Link to="/" hash="work" {...moodProps("wink")}>
                <Button variant="outline" size="lg" className="pointer-events-none rounded-full px-7">
                  {tr(t.hero.cv)}
                </Button>
              </Link>
            </Magnetic>
          </div>

          <Chip variant="soft" className="mt-8 gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            <Chip.Label>{tr(t.hero.status)}</Chip.Label>
          </Chip>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: avatarY }}
        initial={{ opacity: 0, scale: 0.7, filter: "blur(24px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative order-1 mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:order-2 lg:max-w-[480px]"
      >
        <svg viewBox="0 0 200 200" className="absolute inset-0 animate-[spin_40s_linear_infinite] motion-reduce:animate-none" aria-hidden>
          <defs>
            <path id="ring" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
          </defs>
          <text className="fill-muted font-mono" fontSize="7.6" letterSpacing="2.4">
            <textPath href="#ring">{ring}</textPath>
          </text>
        </svg>
        <Orb />
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs uppercase tracking-[0.5em] text-muted sm:flex"
      >
        {tr(t.hero.scroll)}
        <motion.span
          className="block h-10 w-px bg-gradient-to-b from-accent to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.a>
    </section>
  );
}
