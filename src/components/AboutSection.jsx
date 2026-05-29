import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lanyard from './Lanyard/Lanyard';

function HoverButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => alert("Your curiosity can wait for now, still work in progress.")}
      style={{
        padding: '1rem 2rem',
        borderRadius: '30px',
        background: hovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontWeight: 'bold',
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '300px',
        minHeight: '50px',
        transition: 'background 0.3s ease',
        backdropFilter: 'blur(10px)',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={hovered ? 'hover' : 'idle'}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ transformOrigin: 'center', display: 'inline-block' }}
        >
          {hovered ? "get to know me more" : "piqued your interest?"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function AboutSection() {
  const [pulled, setPulled] = useState(false);

  return (
    // Pull section up to remove gap from hero padding
    <section className="section" style={{ padding: '0 2rem 4rem 2rem', marginTop: '-32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4rem'
      }}>
        
        {/* Lanyard container */}
        <div style={{ flex: '1 1 400px', height: '700px', minWidth: '300px', position: 'relative', marginTop: '-80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Zoomed in camera position to make it bigger, moved Y down so string starts at top */}
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Lanyard position={[0, 0, 18]} gravity={[0, -40, 0]} onPull={() => !pulled && setPulled(true)} />
          </div>
          <p style={{
            position: 'absolute',
            bottom: '20px',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.75rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            pull me to get to know more
          </p>
        </div>

        {/* Text Container */}
        <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#fff' }}>About Me</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc', marginBottom: '1.5rem' }}>
            A dedicated Computer Engineering undergraduate who believes the most effective software is created by teams who deeply care about what they build.
          </p>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc', marginBottom: '1.5rem' }}>
            Drawing from hands-on experience in cross-platform development and collaborative hackathons, I value innovative environments and community-driven problem-solving.
          </p>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc', marginBottom: '2.5rem' }}>
            I am looking for an opportunity to grow my technical foundation while helping build solutions that have a positive, real-world impact.
          </p>

          <AnimatePresence>
            {pulled && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <HoverButton />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
