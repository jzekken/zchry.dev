import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// Color palettes for click interaction
const PALETTES = [
  // 1. Max Verstappen / Gundam (Default)
  // Index 0: Primary (JOHN/Button), Index 1: Neutral (HELLO), Index 2: Secondary (ZACHARY), Index 3: Accent
  ['#fcd53f', '#ffffff', '#0055ff', '#e62325'], 
  // 2. Cyberpunk / Neon
  ['#ff00ff', '#ffffff', '#00ffff', '#aa00ff'], 
  // 3. Astrophage Dark / Silver (looks good on dark bg)
  ['#ffffff', '#cccccc', '#888888', '#444444'], 
  // 4. Emerald Matrix
  ['#00ff00', '#ffffff', '#008800', '#003300']  
];

const ParticleSwarm = ({ paletteIndex }) => {
  const pointsRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });

  const particlesCount = 3000; // Reduced count so it's not too distracting

  const [positions, particleColors] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const particleColors = new Float32Array(particlesCount * 3);
    const colors = PALETTES[paletteIndex].map(c => new THREE.Color(c));

    for (let i = 0; i < particlesCount; i++) {
      // Astrophage cluster - tight center with organic falloff
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      // Create a "hollow" center so text remains readable
      // The radius starts at 4 and goes up to 14
      const r = 4 + Math.pow(Math.random(), 1.2) * 10;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = colors[Math.floor(Math.random() * colors.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }
    return [positions, particleColors];
  }, [paletteIndex]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Organic "swarm" rotation & pulsing
      targetRotation.current.x += delta * 0.15;
      targetRotation.current.y += delta * 0.2;

      const pointerX = state.pointer.x * 2.0;
      const pointerY = -(state.pointer.y * 2.0);

      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotation.current.x + pointerY, 0.05);
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotation.current.y + pointerX, 0.05);
      
      // Simulate pulsating breathing swarm
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.04;
      pointsRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <points ref={pointsRef}>
      {/* key={paletteIndex} forces WebGL buffer to rebuild when colors change */}
      <bufferGeometry key={paletteIndex}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleColors.length / 3}
          array={particleColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08} // Increased size so individual particles are more visible
        vertexColors={true}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default function HeroVisuals() {
  const [paletteIndex, setPaletteIndex] = useState(() => {
    const saved = localStorage.getItem('themeIndex');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  // Apply the loaded theme immediately on mount
  useEffect(() => {
    const p = PALETTES[paletteIndex];
    const root = document.documentElement;
    root.style.setProperty('--accent-yellow', p[0]);
    root.style.setProperty('--accent-white', p[1]);
    root.style.setProperty('--accent-blue-bright', p[2]);
    root.style.setProperty('--accent-red', p[3]);
    root.style.setProperty('--accent-blue', p[2]);
  }, [paletteIndex]);

  const handleThemeChange = () => {
    const nextIndex = (paletteIndex + 1) % PALETTES.length;
    setPaletteIndex(nextIndex);
    localStorage.setItem('themeIndex', nextIndex);
  };

  const currentPalette = PALETTES[paletteIndex];

  return (
    <section id="hero" className="section" style={{ padding: '2rem', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <div 
        style={{
          position: 'relative',
          flexGrow: 1, // Fill available height
          borderRadius: '2rem',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-color)', // Solid background to hide overlapping elements behind
          zIndex: 10, // Ensure it sits above the About section
          border: '1px solid rgba(255, 255, 255, 0.1)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
        title="Welcome"
      >
        <div className="canvas-container" style={{ pointerEvents: 'none' }}>
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <ParticleSwarm paletteIndex={paletteIndex} />
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* Text inside the rounded container */}
        <div className="container" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', marginBottom: '1rem', lineHeight: '1.1', transition: 'color 0.3s ease' }}>
              <span style={{ color: currentPalette[1] }}>HELLO, I'M </span><br />
              <span style={{ color: currentPalette[0] }}>JOHN </span>
              <span style={{ color: currentPalette[2] }}>ZACHARY</span>
            </h1>
          </div>
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', maxWidth: '500px', marginBottom: '2rem' }}>
              3rd year Computer Engineering student.<br/>
             AI and Full Stack Developer.
            </p>
            <button 
              onClick={handleThemeChange}
              style={{
              background: 'var(--accent-yellow)',
              color: '#000000',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, background 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
              Change Theme
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
