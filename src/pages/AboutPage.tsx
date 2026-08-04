import { AboutHero } from '../components/sections/AboutHero';
import { AboutStory } from '../components/sections/AboutStory';
import { MissionVision } from '../components/sections/MissionVision';
import { WhyMagnus } from '../components/sections/WhyMagnus';
import { IndustriesServed } from '../components/sections/IndustriesServed';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { AboutStats } from '../components/sections/AboutStats';
import { AboutCTA } from '../components/sections/AboutCTA';
import '../styles/AboutPage.css';

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <MissionVision />
      <WhyMagnus />
      <IndustriesServed />
      <ProcessTimeline />
      <AboutStats />
      <AboutCTA />
    </>
  );
}