import HeroVisuals from './components/HeroVisuals';
import AboutSection from './components/AboutSection';
import FeaturedProjects from './components/FeaturedProjects';
import TechStackSection from './components/TechStackSection';
import AstronautGoal from './components/AstronautGoal';
import PlugsFooter from './components/PlugsFooter';
import FlowingLines from './components/FlowingLines';

function App() {
  return (
    <main style={{ backgroundColor: 'var(--bg-color)', position: 'relative' }}>
      <FlowingLines />
      <HeroVisuals />
      <AboutSection />
      <FeaturedProjects />
      <TechStackSection />
      <AstronautGoal />
      <PlugsFooter />
    </main>
  );
}

export default App;
