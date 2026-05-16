import Hero from "@/components/sections/hero";
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <TechMarquee />
      <Skills />
      <Projects />
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
