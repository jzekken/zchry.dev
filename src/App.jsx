import React, { Suspense, lazy } from 'react';
import HeroVisuals from './components/HeroVisuals';
import FlowingLines from './components/FlowingLines';

// Lazy loaded components (everything below the fold)
const AboutSection = lazy(() => import('./components/AboutSection'));
const FeaturedProjects = lazy(() => import('./components/FeaturedProjects'));
const TechStackSection = lazy(() => import('./components/TechStackSection'));
const AstronautGoal = lazy(() => import('./components/AstronautGoal'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const PlugsFooter = lazy(() => import('./components/PlugsFooter'));

function App() {
  return (
    <main style={{ backgroundColor: 'var(--bg-color)', position: 'relative' }}>
      {/* Critical assets loaded immediately */}
      <FlowingLines />
      <HeroVisuals />

      {/* Deferred assets */}
      <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Loading...</div>}>
        <AboutSection />
        <FeaturedProjects />
        <TechStackSection />
        <AstronautGoal />
        <ContactSection />
        <PlugsFooter />
      </Suspense>
    </main>
  );
}

export default App;
