import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/Hero";
import { About, Contact, Experience, Projects } from "../components/Sections";
import { Statement } from "../components/Statement";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Statement />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
