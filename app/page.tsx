import Hero from "@/components/sections/hero";
import Experience from "@/components/sections/experience";
import SkillsSection from "@/components/sections/skills";
import GitHubSection from "@/components/sections/github";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";

export default function HomePage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Hero />
      <Experience />
      <SkillsSection />
      <GitHubSection />
      <Projects />
      <Contact />
    </div>
  );
}
