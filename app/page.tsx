import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Projects } from "@/components/projects";
import { Gallery } from "@/components/gallery";
import { Certifications } from "@/components/certifications";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { NumbersStrip } from "@/components/numbers-strip";
import { DispatchJourney } from "@/components/dispatch-journey";
import { SectionIndex } from "@/components/section-index";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-900 transition-colors duration-500 dark:bg-[#0f0e0c] dark:text-zinc-100">
      <Header />
      <SectionIndex />
      <main id="main">
        <Hero />
        <About />
        <NumbersStrip />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <DispatchJourney />
        <Gallery />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
