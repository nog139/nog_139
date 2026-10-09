import { Outlet, createRootRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { CommandPalette } from "../components/CommandPalette";
import { Header } from "../components/Header";
import { Pattern139, Psalm139, Watermark139 } from "../components/Psalm139";
import { Footer } from "../components/Sections";
import { Spotlight } from "../components/Spotlight";
import { PrefsProvider } from "../lib/prefs";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => (
    <main className="grid min-h-svh place-items-center px-4 text-center">
      <div>
        <p className="font-display text-8xl font-extrabold text-accent">404</p>
        <a href="/" className="mt-4 inline-block font-mono text-sm text-muted hover:text-accent">← home</a>
      </div>
    </main>
  ),
});

function RootLayout() {
  return (
    <PrefsProvider>
      <MotionConfig reducedMotion="user">
        <div className="grain">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
          >
            Skip to content
          </a>
          <Pattern139 />
          <Watermark139 />
          <Spotlight />
          <Header />
          <main id="main">
            <Outlet />
          </main>
          <Footer />
          <CommandPalette />
          <Psalm139 />
        </div>
      </MotionConfig>
    </PrefsProvider>
  );
}
