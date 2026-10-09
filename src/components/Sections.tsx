import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button, Card, Chip, Tabs } from "@heroui/react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { jobs, profile, projects, psalm, skills, t } from "../lib/content";
import { moodProps, setMood } from "../lib/mood";
import { usePrefs } from "../lib/prefs";
import { Magnetic } from "./Magnetic";
import { openPsalm } from "./Psalm139";
import { Highlight } from "./Highlight";
import { Reveal, SectionTitle, Words } from "./Reveal";
import { IconArrow, IconLinkedin, IconMail } from "./icons";

function Marquee({ items, reverse }: { items: readonly string[]; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div
        className="animate-marquee flex shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused]"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((s, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-separator px-5 py-2 font-display text-lg font-semibold transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function About() {
  const { tr, lang } = usePrefs();
  const half = Math.ceil(skills.length / 2);

  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionTitle index="01">{tr(t.about.title)}</SectionTitle>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="font-display text-2xl font-semibold leading-snug sm:text-3xl">
              <Highlight text={tr(t.about.lead)} glow={tr(t.about.leadGlow)} />
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted">{tr(t.about.body)}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {t.about.soft[lang].map((s) => (
                <Chip key={s} variant="secondary">
                  {s}
                </Chip>
              ))}
            </div>
            <p className="mt-6 font-mono text-sm text-muted">{tr(t.about.languages)}</p>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-3">
              {t.about.stats.map((s) => (
                <Card key={s.value + s.label.en} className="items-start p-4">
                  <span className="fx-text font-display text-5xl font-extrabold">{s.value}</span>
                  <span className="text-xs leading-tight text-muted">{tr(s.label)}</span>
                </Card>
              ))}
            </div>
            <Card className="p-5">
              <Card.Header>
                <Card.Title className="font-mono text-xs uppercase tracking-widest text-muted">{tr(t.about.education)}</Card.Title>
              </Card.Header>
              <Card.Content className="gap-4">
                <div>
                  <p className="font-display text-lg font-semibold">Universidade São Judas Tadeu</p>
                  <p className="text-sm text-muted">{lang === "pt" ? "Bacharelado em Análise de Sistemas · 2027" : "Bachelor in Systems Analysis · 2027"}</p>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold">ITB — Instituto Técnico de Barueri</p>
                  <p className="text-sm text-muted">{lang === "pt" ? "Técnico em Informática" : "Technical High School in Informatics"}</p>
                </div>
              </Card.Content>
            </Card>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-3">
        <Marquee items={skills.slice(0, half)} />
        <Marquee items={skills.slice(half)} reverse />
      </div>
    </section>
  );
}

export function Experience() {
  const { tr, lang } = usePrefs();

  return (
    <section id="work" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-24 sm:px-8 sm:py-32">
      <SectionTitle index="02">{tr(t.work.title)}</SectionTitle>

      <Reveal>
        <Tabs orientation="vertical" className="flex-col gap-6 md:flex-row md:gap-10">
          <Tabs.ListContainer className="-mx-4 overflow-x-auto rounded-none bg-transparent px-4 md:mx-0 md:self-start md:px-0">
            <Tabs.List
              aria-label={tr(t.work.title)}
              className="min-w-max gap-0 rounded-none border-b border-separator bg-transparent p-0 md:w-60 md:border-b-0 md:border-l"
            >
              {jobs.map((job) => (
                <Tabs.Tab
                  key={job.slug}
                  id={job.slug}
                  className="h-12 justify-start whitespace-nowrap rounded-none px-5 font-mono text-sm text-muted transition-colors hover:text-foreground data-[selected=true]:text-foreground"
                >
                  {job.company}
                  <Tabs.Indicator className="rounded-none bg-foreground/5 shadow-none">
                    <span className="fx-line absolute inset-x-0 bottom-0 h-0.5 md:inset-y-0 md:left-0 md:right-auto md:h-auto md:w-0.5" />
                  </Tabs.Indicator>
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>

          {jobs.map((job) => (
            <Tabs.Panel key={job.slug} id={job.slug} className="min-h-80 flex-1">
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                <h3 className="font-display text-2xl font-bold">
                  {tr(job.role)} <span className="fx-text">@ {job.company}</span>
                </h3>
                <p className="mt-1 font-mono text-sm text-muted">{tr(job.period)}</p>
                <ul className="mt-6 space-y-3">
                  {job.highlights[lang].slice(0, 3).map((h) => (
                    <li key={h} className="relative pl-6 leading-relaxed text-muted">
                      <span className="absolute left-0 top-0 text-accent">▹</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <Chip key={s} size="sm" variant="soft" color="accent">
                      {s}
                    </Chip>
                  ))}
                </div>
                <Link
                  to="/work/$slug"
                  params={{ slug: job.slug }}
                  className="group mt-8 inline-flex items-center gap-2 font-mono text-sm text-accent"
                >
                  {tr(t.work.details)}
                  <IconArrow width={16} height={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </Reveal>
    </section>
  );
}

function TiltCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const { tr } = usePrefs();
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const rx = useSpring(0, { stiffness: 150, damping: 15 });
  const ry = useSpring(0, { stiffness: 150, damping: 15 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(400px circle at ${gx}% ${gy}%, oklch(0.8 0.2 ${project.hue} / 0.18), transparent 60%)`;

  return (
    <Reveal delay={(index % 2) * 0.1} className={project.wide ? "md:col-span-2" : ""}>
      <motion.div
        ref={ref}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry.set((px - 0.5) * 10);
          rx.set((0.5 - py) * 10);
          gx.set(px * 100);
          gy.set(py * 100);
        }}
        onPointerEnter={() => {
          setHover(true);
          setMood("surprised");
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
          setHover(false);
          setMood("idle");
        }}
        className="group relative h-full rounded-[min(32px,var(--radius-3xl))]"
      >
        <div aria-hidden className={`fx-line absolute -inset-[1.5px] rounded-[inherit] transition-opacity duration-500 ${hover ? "opacity-100" : "opacity-0"}`} />
        <Card className="safari-clip relative h-full overflow-hidden p-6 sm:p-8">
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
          <div
            aria-hidden
            className="absolute -right-24 -top-24 size-72 opacity-60 transition-transform duration-500 group-hover:scale-150"
            style={{ background: `radial-gradient(closest-side, oklch(0.75 0.2 ${project.hue} / 0.55), transparent)` }}
          />
          <Card.Header className="relative gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">{tr(project.tag)}</span>
            <Card.Title className={`font-display font-extrabold leading-[0.95] tracking-tight ${project.big ? "text-4xl sm:text-5xl" : "text-3xl"}`}>
              {project.title}
            </Card.Title>
          </Card.Header>
          <Card.Content className="relative mt-2">
            <p className="max-w-xl leading-relaxed text-muted">{tr(project.description)}</p>
          </Card.Content>
          <Card.Footer className="relative mt-auto flex-wrap gap-x-4 gap-y-1 pt-4">
            {project.stack.map((s) => (
              <span key={s} className="font-mono text-xs text-muted">
                {s}
              </span>
            ))}
          </Card.Footer>
        </Card>
      </motion.div>
    </Reveal>
  );
}

export function Projects() {
  const { tr } = usePrefs();
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-8 sm:py-32">
      <SectionTitle index="03">{tr(t.projects.title)}</SectionTitle>
      <Reveal>
        <p className="-mt-6 mb-10 font-mono text-sm text-muted">// {tr(t.projects.note)}</p>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <TiltCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const { tr } = usePrefs();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-4xl scroll-mt-24 px-4 py-24 text-center sm:px-8 sm:py-40">
      <div aria-hidden className="absolute left-1/2 top-1/3 size-[90vmin] -translate-x-1/2 -translate-y-1/2 opacity-20">
        <div className="fx-glow size-full" />
      </div>
      <div className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <span className="fx-text">04</span> — {tr(t.nav.contact)}
        </p>
        <h2 className="mt-6 font-display text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tighter">
          <Words text={tr(t.contact.title)} after={<span className="fx-text">.</span>} />
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">{tr(t.contact.body)}</p>
        </Reveal>
      </div>

      <Reveal delay={0.4} className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
        <Magnetic strength={0.4}>
          <a href={`mailto:${profile.email}`} {...moodProps("happy")}>
            <Button variant="primary" size="lg" className="pointer-events-none rounded-full px-8 font-display text-lg font-semibold">
              {profile.email}
            </Button>
          </a>
        </Magnetic>
        <Button variant="outline" size="lg" className="rounded-full" onPress={copy} {...moodProps("wink")}>
          {copied ? tr(t.contact.copied) : tr(t.contact.copy)}
        </Button>
      </Reveal>

      <Reveal delay={0.2} className="mt-12 flex justify-center gap-2">
        {[
          { href: profile.linkedin, label: "LinkedIn", Icon: IconLinkedin },
          { href: `mailto:${profile.email}`, label: "Email", Icon: IconMail },
        ].map(({ href, label, Icon }) => (
          <Magnetic key={label} strength={0.5}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid size-12 place-items-center rounded-full border border-separator text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon />
            </a>
          </Magnetic>
        ))}
      </Reveal>
    </section>
  );
}

export function Footer() {
  const { tr } = usePrefs();
  return (
    <footer className="border-t border-separator px-4 py-8 text-center font-mono text-xs text-muted">
      <p>{tr(t.footer.made)}</p>
      <p className="mt-1">© {new Date().getFullYear()} {profile.fullName}</p>
      <button
        onClick={openPsalm}
        title={tr(psalm.hint)}
        className="group mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 transition-colors hover:text-foreground"
      >
        <span className="transition-transform duration-500 group-hover:rotate-180">✦</span>
        <span className="group-hover:fx-text">{tr(psalm.ref)}</span>
      </button>
    </footer>
  );
}
