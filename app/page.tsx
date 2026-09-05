import Hero from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Education from "@/components/sections/education";
import GitHub from "@/components/sections/github";
import Certifications from "@/components/sections/certifications";
import Testimonials from "@/components/sections/testimonials";
import Blog from "@/components/sections/blog";
import TechMarquee from "@/components/sections/tech-marquee";
import Contact from "@/components/sections/contact";
import { SoundEqualizer } from "@/components/effects/sound-equalizer";
import { Scroll3DCanvas } from "@/components/effects/scroll-3d-canvas";

export default function HomePage() {
  return (
    <>

      {/* Floating Sound Equalizer Controller */}
      <SoundEqualizer />

      {/* Three.js Scroll-Driven 3D Canvas */}
      <Scroll3DCanvas />

      {/* Main Portfolio Sections */}
      <Hero />
      <Capabilities />
      <Projects />
      <About />
      <TechMarquee />
      <Skills />
      <Experience />
      <Education />
      <GitHub />
      <Certifications />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
}
