import { ScrollAnimation } from "@/components/effects/scroll-animation";
import Hero from "@/components/sections/hero";
import GithubContributions from "@/components/sections/github-contributions";
import TechMarquee from "@/components/sections/tech-marquee";
import Projects from "@/components/sections/projects";
import GithubRepos from "@/components/sections/github-repos";
import ResumeSection from "@/components/sections/resume";
import Contact from "@/components/sections/contact";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <ScrollAnimation delay={0}>
        <Hero />
      </ScrollAnimation>

      <ScrollAnimation delay={0.08}>
        <GithubContributions />
      </ScrollAnimation>

      <ScrollAnimation delay={0.08}>
        <TechMarquee />
      </ScrollAnimation>

      <ScrollAnimation delay={0.08}>
        <Projects />
      </ScrollAnimation>

      <ScrollAnimation delay={0.08}>
        <GithubRepos />
      </ScrollAnimation>

      <ScrollAnimation delay={0.08}>
        <ResumeSection />
      </ScrollAnimation>

      <ScrollAnimation delay={0.08}>
        <Contact />
      </ScrollAnimation>
    </div>
  );
}
