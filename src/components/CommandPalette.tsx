import { useEffect, useMemo, useRef, useState } from "react";
import { Kbd, Modal } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { jobs, profile, psalm, t } from "../lib/content";
import { openPsalm } from "./Psalm139";
import { usePrefs } from "../lib/prefs";

type Command = { id: string; group: string; label: string; hint?: string; secret?: boolean; run: () => void };

export function openPalette() {
  window.dispatchEvent(new Event("palette:open"));
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const { tr, lang, setLang, toggleTheme, theme } = usePrefs();
  const pt = lang === "pt";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  const commands = useMemo<Command[]>(() => {
    const go = (hash: string) => () => navigate({ to: "/", hash });
    const nav = pt ? "Navegar" : "Navigate";
    const exp = pt ? "Experiência" : "Experience";
    const act = pt ? "Ações" : "Actions";
    return [
      { id: "about", group: nav, label: tr(t.nav.about), hint: "#about", run: go("about") },
      { id: "work", group: nav, label: tr(t.nav.work), hint: "#work", run: go("work") },
      { id: "projects", group: nav, label: tr(t.nav.projects), hint: "#projects", run: go("projects") },
      { id: "contact", group: nav, label: tr(t.nav.contact), hint: "#contact", run: go("contact") },
      ...jobs.map((j) => ({
        id: `job-${j.slug}`,
        group: exp,
        label: `${j.company} — ${tr(j.role)}`,
        hint: tr(j.period),
        run: () => navigate({ to: "/work/$slug", params: { slug: j.slug } }),
      })),
      {
        id: "theme",
        group: act,
        label: theme === "dark" ? (pt ? "Mudar para tema claro" : "Switch to light theme") : pt ? "Mudar para tema escuro" : "Switch to dark theme",
        run: toggleTheme,
      },
      { id: "lang", group: act, label: pt ? "Switch to English" : "Mudar para Português", run: () => setLang(pt ? "en" : "pt") },
      { id: "email", group: act, label: tr(t.contact.copy), hint: profile.email, run: () => navigator.clipboard?.writeText(profile.email) },
      { id: "linkedin", group: act, label: "LinkedIn", hint: "↗", run: () => window.open(profile.linkedin, "_blank", "noopener") },
      { id: "psalm", group: "✦", label: `${tr(psalm.ref)} · salmo psalm`, hint: "139", secret: true, run: openPsalm },
    ];
  }, [navigate, pt, setLang, theme, toggleTheme, tr]);

  const q = query.trim().toLowerCase();
  const filtered = commands.filter(
    (c) => (!c.secret || q.length >= 3) && `${c.label} ${c.group} ${c.hint ?? ""}`.toLowerCase().includes(q),
  );

  const run = (c: Command | undefined) => {
    if (!c) return;
    setOpen(false);
    requestAnimationFrame(() => c.run());
  };

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Modal.Backdrop>
        <Modal.Container placement="top" size="md">
          <Modal.Dialog aria-label="Command palette" className="overflow-hidden p-0">
            <div className="flex items-center gap-3 border-b border-separator px-4">
              <span className="font-mono text-accent">&gt;</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  } else if (e.key === "Enter") {
                    run(filtered[active]);
                  }
                }}
                placeholder={tr(t.palette.placeholder)}
                className="h-14 flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
              />
              <Kbd>esc</Kbd>
            </div>
            <ul id="palette-list" ref={listRef} role="listbox" className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">{tr(t.palette.empty)}</li>}
              {filtered.map((c, i) => (
                <li key={c.id}>
                  {(i === 0 || filtered[i - 1].group !== c.group) && (
                    <div className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-widest text-muted">{c.group}</div>
                  )}
                  <div
                    id={`cmd-${c.id}`}
                    data-index={i}
                    role="option"
                    aria-selected={i === active}
                    onPointerMove={() => setActive(i)}
                    onClick={() => run(c)}
                    className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      i === active ? "bg-accent text-accent-foreground" : "text-foreground"
                    }`}
                  >
                    <span>{c.secret ? c.label.split(" · ")[0] : c.label}</span>
                    {c.hint && <span className={`truncate font-mono text-xs ${i === active ? "opacity-80" : "text-muted"}`}>{c.hint}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
