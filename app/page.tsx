import { Hero } from '@/components/hero/Hero';
import { ScrollIntro } from '@/components/about/ScrollIntro';
import { WorkSection } from '@/components/work/WorkSection';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { AboutSection } from '@/components/about/AboutSection';
import { ContactSection } from '@/components/contact/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollIntro />
      <WorkSection />
      <SkillsSection />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
