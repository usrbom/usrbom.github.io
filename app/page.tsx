import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import WritingTeaser from "@/components/WritingTeaser";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-pale-gray">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 space-y-24">
        <section id="home" className="scroll-mt-28">
          <Hero />
        </section>

        <section
          id="projects"
          className="scroll-mt-28 border-t border-white/70 pt-16"
        >
          <Projects />
        </section>

        <section
          id="timeline"
          className="scroll-mt-28 border-t border-white/70 pt-16"
        >
          <Timeline />
        </section>

        <section
          id="writing"
          className="scroll-mt-28 border-t border-white/70 pt-16"
        >
          <WritingTeaser />
        </section>

        <section
          id="contact"
          className="scroll-mt-28 border-t border-white/70 pt-16"
        >
          <Contact />
        </section>
      </div>
    </main>
  );
}
