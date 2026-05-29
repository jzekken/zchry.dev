import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lanyard from './Lanyard/Lanyard';

const FacebookIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const InstagramIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const GithubIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const DiscordIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 9c0-5-3-7-3-7s-1-.5-3-.5c0 0-1 2-1 2H10s-1-2-1-2c-2 0-3 .5-3 .5s-3 2-3 7c0 5 3 10 3 10s1 1 3 1 1-1 1-1h6s0 1 1 1 3-1 3-1 3-5 3-10z"></path><circle cx="9" cy="12" r="1"></circle><circle cx="15" cy="12" r="1"></circle></svg>;


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
    <section id="about" className="section" style={{ padding: '0 2rem 4rem 2rem', marginTop: '-32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: '#ccc', marginBottom: '1.25rem' }}>
            I'm a Computer Engineering undergraduate who believes the best software comes from teams that deeply care about their craft.
          </p>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: '#ccc', marginBottom: '1.25rem' }}>
            With hands-on experience in cross-platform development and hackathons, I thrive in innovative, community-driven environments.
          </p>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: '#ccc', marginBottom: '2rem' }}>
            I'm looking to grow my technical foundation while building solutions that make a positive, real-world impact.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
            {[
              { icon: <FacebookIcon />, url: 'https://www.facebook.com/cold.takoyaki', name: 'Facebook' },
              { icon: <InstagramIcon />, url: 'https://www.instagram.com/zchry.io/', name: 'Instagram' },
              { icon: <GithubIcon />, url: 'https://github.com/jzekken', name: 'GitHub' },
              { icon: <DiscordIcon />, url: 'https://discord.com/users/746288261491851304', name: 'Discord' }
            ].map(social => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: 'var(--accent-white)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>

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
