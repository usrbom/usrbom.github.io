import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import RecentArticles from "@/components/RecentArticles";
import Contact from "@/components/Contact";
import InteractiveGridBackground from "@/components/InteractiveGridBackground";
import Reveal from "@/components/Reveal";

const ENABLE_INTERACTIVE_GRID_BACKGROUND = true;

export default function Home() {
  const pageContent = (
    <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-24 pt-28 md:px-8 lg:gap-20 lg:pb-32 lg:pt-32">
      <section id="home" className="scroll-mt-28">
        <Hero />
      </section>

      <Reveal
        as="section"
        id="skills"
        className="scroll-mt-28"
        delayMs={24}
      >
        <Skills />
      </Reveal>

      <section id="projects" className="scroll-mt-28">
        <Projects />
      </section>

      <section id="timeline" className="scroll-mt-28">
        <Timeline />
      </section>

      <Reveal as="section" id="articles" className="scroll-mt-28" delayMs={80}>
        <RecentArticles />
      </Reveal>

      <Reveal as="section" id="contact" className="scroll-mt-28" delayMs={100}>
        <Contact />
      </Reveal>
    </div>
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-pale-gray dark:bg-dark-bg">
      <Navbar />
      {ENABLE_INTERACTIVE_GRID_BACKGROUND ? (
        <InteractiveGridBackground>{pageContent}</InteractiveGridBackground>
      ) : (
        pageContent
      )}
    </main>
  );
}
