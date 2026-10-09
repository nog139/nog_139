import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button, Kbd, Tooltip } from "@heroui/react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { t } from "../lib/content";
import { usePrefs } from "../lib/prefs";
import { openPalette } from "./CommandPalette";
import { IconCommand, IconMoon, IconSun } from "./icons";

const links = [
  ["about", t.nav.about],
  ["work", t.nav.work],
  ["projects", t.nav.projects],
  ["contact", t.nav.contact],
] as const;

export function Header() {
  const { tr, lang, setLang, theme, toggleTheme } = usePrefs();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
    setScrolled(y > 20);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-[background,box-shadow] duration-300 ${
        scrolled ? "bg-background/75 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)] backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-8">
        <Link to="/" hash="" className="group font-display text-2xl font-extrabold tracking-tight" aria-label="Home">
          vn<span className="fx-text inline-block transition-transform group-hover:-translate-y-1">.</span>
        </Link>

        <ol className="hidden items-center gap-1 md:flex">
          {links.map(([hash, label], i) => (
            <li key={hash}>
              <Link
                to="/"
                hash={hash}
                className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-accent"
              >
                <span className="mr-1 font-mono text-xs text-accent">0{i + 1}.</span>
                {tr(label)}
              </Link>
            </li>
          ))}
        </ol>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onPress={openPalette} className="hidden gap-2 font-mono text-xs sm:flex">
            <IconCommand width={14} height={14} />
            <Kbd>Ctrl+K</Kbd>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onPress={() => setLang(lang === "pt" ? "en" : "pt")}
            aria-label={lang === "pt" ? "Switch to English" : "Mudar para Português"}
            className="font-mono text-xs"
          >
            {lang === "pt" ? "EN" : "PT"}
          </Button>
          <Tooltip delay={300}>
            <Button variant="ghost" size="sm" isIconOnly onPress={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <IconSun width={18} height={18} /> : <IconMoon width={18} height={18} />}
            </Button>
            <Tooltip.Content>{theme === "dark" ? "Light" : "Dark"}</Tooltip.Content>
          </Tooltip>
          <Button variant="ghost" size="sm" isIconOnly onPress={openPalette} aria-label="Menu" className="sm:hidden">
            <IconCommand width={18} height={18} />
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}
