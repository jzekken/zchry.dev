import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment, Float, Torus, Stars } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const AnimatedGroup = ({ sectionRef, textRef, startPosition }) => {
  const parentRef = useRef();
  const portalRef = useRef();
  const astronautRef = useRef();
  
  const { scene, animations } = useGLTF('/Astronaut.glb');
  const { actions } = useAnimations(animations, astronautRef);

  useFrame((state, delta) => {
    if (portalRef.current) {
      portalRef.current.rotation.z -= delta * 0.5;
    }
  });

  useEffect(() => {
    if (!parentRef.current || !sectionRef.current || !textRef.current) return;

    // Parent group starts top-left
    parentRef.current.position.set(...startPosition);
    parentRef.current.scale.set(0.1, 0.1, 0.1); // Shrink the whole group initially

    // Astronaut starts facing away/rotated so he can spin in
    if (astronautRef.current) {
      astronautRef.current.rotation.set(Math.PI / 4, -Math.PI * 2, Math.PI / 4); 
    }

    // Initial text state
    gsap.set(textRef.current, { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
        onUpdate: (self) => {
          const animToPlay = actions['Wave'] || Object.values(actions)[0];
          
          if (self.progress > 0.8) {
            // Independent text fade-in (not scrubbed!)
            gsap.to(textRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
            
            // Trigger wave
            if (animToPlay && animToPlay.getEffectiveWeight() === 0) {
              animToPlay.reset().fadeIn(0.5).play();
              animToPlay.setLoop(1, 1);
              animToPlay.clampWhenFinished = true;
            }
          } else {
            // Text fade-out if scrolled back
            gsap.to(textRef.current, { opacity: 0, y: 50, duration: 0.5, overwrite: 'auto' });
            
            // Stop wave
            if (animToPlay && animToPlay.getEffectiveWeight() > 0) {
              animToPlay.fadeOut(0.5);
            }
          }
        }
      }
    });

    tl.to(parentRef.current.position, {
      x: 0, 
      y: -2, // Center vertically
      z: 2,  // Foreground
      ease: 'power2.out'
    }, 0)
    .to(parentRef.current.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      ease: 'power2.out'
    }, 0)
    .to(astronautRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
      ease: 'power2.inOut' // Spin to face forward precisely when he lands
    }, 0);

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [actions, sectionRef, textRef, startPosition]);

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={parentRef}>
        
        {/* The Portal Ring (positioned behind the astronaut) */}
        <group ref={portalRef} position={[0, 2, -2]}>
          <Torus args={[3, 0.2, 32, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#fcd53f" emissive="#fcd53f" emissiveIntensity={2} />
          </Torus>
          <Torus args={[3.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
          </Torus>
          <Torus args={[2.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#0055ff" emissive="#0055ff" emissiveIntensity={1} />
          </Torus>
        </group>

        {/* The Astronaut */}
        <group ref={astronautRef}>
          <primitive object={scene} />
        </group>

      </group>
    </Float>
  );
};

export default function AstronautGoal() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const startPosition = [-25, 12, -40]; // Deep top-left starting point for the group

  return (
    <section ref={sectionRef} className="section" style={{ height: '100vh', backgroundColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
      
      {/* Canvas Background */}
      <div className="canvas-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <Environment preset="city" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {/* Distant Planets */}
            <Float speed={0.8} rotationIntensity={0.5} floatIntensity={1}>
              <mesh position={[12, 6, -20]}>
                <sphereGeometry args={[3.5, 64, 64]} />
                <meshStandardMaterial color="#ff3333" emissive="#330000" roughness={0.8} />
              </mesh>
            </Float>
            <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5}>
              <mesh position={[-15, -8, -25]}>
                <sphereGeometry args={[2.5, 64, 64]} />
                <meshStandardMaterial color="#0055ff" emissive="#000033" roughness={0.6} />
              </mesh>
            </Float>
            <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.5}>
              <mesh position={[5, -12, -30]}>
                <sphereGeometry args={[4, 64, 64]} />
                <meshStandardMaterial color="#33ff88" emissive="#003311" roughness={0.9} />
              </mesh>
            </Float>

            <AnimatedGroup sectionRef={sectionRef} textRef={textRef} startPosition={startPosition} />
          </Canvas>
        </div>

        {/* Overlay Text */}
        <div ref={textRef} className="container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, width: '100%', opacity: 0, pointerEvents: 'none' }}>
          <h2 style={{ fontSize: '5rem', textAlign: 'center', marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            <span className="text-white">THE </span>
            <span className="text-red">GOAL</span>
          </h2>
          <p style={{ textAlign: 'center', fontSize: '1.5rem', maxWidth: '600px', margin: '0 auto 2rem auto', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            Constantly pushing boundaries and exploring the unknown limits of digital space.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', pointerEvents: 'auto' }}>
            <button 
              onClick={handleContactClick}
              style={{
                padding: '1rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                backgroundColor: 'var(--accent-red)',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(230, 35, 37, 0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(230, 35, 37, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(230, 35, 37, 0.4)';
              }}
            >
              <span>↓</span>
              <span>Contact Me</span>
              <span>↓</span>
            </button>
          </div>
      </div>
    </section>
  );
}

// Preload the model so it doesn't pop in
useGLTF.preload('/Astronaut.glb');
