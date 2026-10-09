import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Chip } from "@heroui/react";
import { motion } from "motion/react";
import { jobs, t } from "../lib/content";
import { usePrefs } from "../lib/prefs";
import { IconArrow, IconBack } from "../components/icons";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const index = jobs.findIndex((j) => j.slug === params.slug);
    if (index === -1) throw notFound();
    return { job: jobs[index], next: jobs[(index + 1) % jobs.length] };
  },
  component: JobPage,
});

function JobPage() {
  const { job, next } = Route.useLoaderData();
  const { tr, lang } = usePrefs();

  return (
    <article className="mx-auto min-h-svh max-w-3xl px-4 pb-24 pt-32 sm:px-8">
      <Link to="/" hash="work" className="group inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-accent">
        <IconBack width={16} height={16} className="transition-transform group-hover:-translate-x-1" />
        {tr(t.work.back)}
      </Link>

      <motion.header
        key={job.slug}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10"
      >
        <p className="font-mono text-sm text-accent">{tr(job.period)}</p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,8vw,5rem)] font-extrabold leading-none tracking-tighter">
          {job.company}
          <span className="fx-text">.</span>
        </h1>
        <p className="mt-3 font-display text-2xl text-muted">{tr(job.role)}</p>
        <p className="mt-8 text-xl leading-relaxed">{tr(job.summary)}</p>
      </motion.header>

      <ul className="mt-12 space-y-5">
        {job.highlights[lang].map((h, i) => (
          <motion.li
            key={h}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="relative border-l-2 border-separator pl-6 text-lg leading-relaxed text-muted transition-colors hover:border-accent hover:text-foreground"
          >
            {h}
          </motion.li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap gap-2">
        {job.stack.map((s) => (
          <Chip key={s} variant="soft" color="accent">
            {s}
          </Chip>
        ))}
      </div>

      <Link
        to="/work/$slug"
        params={{ slug: next.slug }}
        className="group mt-20 flex items-center justify-between rounded-2xl border border-separator p-6 transition-colors hover:border-accent"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">{lang === "pt" ? "Próximo" : "Next"}</p>
          <p className="mt-1 font-display text-2xl font-bold group-hover:text-accent">{next.company}</p>
        </div>
        <IconArrow width={28} height={28} className="text-accent transition-transform group-hover:rotate-45" />
      </Link>
    </article>
  );
}
