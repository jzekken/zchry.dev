import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Stack', id: 'stack' },
  { label: 'Contact', id: 'contact' }
];

export default function Navbar() {
  const [activeId, setActiveId] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Force 'contact' active if scrolled to absolute bottom
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 10) {
        setActiveId('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -40% 0px' }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        pointerEvents: 'none' // Allow clicks to pass through empty areas
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          padding: '0.75rem 2rem',
          borderRadius: '50px',
          background: scrolled ? 'rgba(0, 0, 0, 0.4)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          border: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none',
          transition: 'all 0.3s ease',
          pointerEvents: 'auto'
        }}
      >
        {NAV_ITEMS.map(({ label, id }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: isActive ? 'var(--accent-yellow)' : '#fff',
                fontSize: '0.9rem',
                fontWeight: isActive ? 'bold' : '500',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                padding: '0.5rem',
                transition: 'color 0.3s ease',
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--accent-white)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = '#fff';
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
