import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { X } from 'lucide-react';

export default function ProjectDetails({ project, onClose }) {
  const scrollContainerRef = useRef(null);
  const outerRef = useRef(null);

  const images = project?.screenshots?.length
    ? project.screenshots
    : [project?.image, project?.image, project?.image, project?.image].filter(Boolean);

  const numImages = images.length;

  // useScroll watches the internal scroll container, not window.
  // target=outerRef (the tall div inside) + container=scrollContainerRef (the scrollable div).
  const { scrollYProgress } = useScroll({
    target: outerRef,
    container: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  // Layout:
  //   Right panel = 60vw wide, overflow hidden.
  //   Each image = 55vw wide, 5vw gap → stride = 60vw per image.
  //   paddingLeft = 5vw  → first image left edge starts 5vw in,
  //     so 55vw image fills from 5vw to 60vw → right 0vw cut off → full image visible BUT...
  //
  // We actually want a sneak peek of the NEXT image on the right side.
  // So: center the current image, and let the next one peek from the right edge.
  //   Image center when centered in 60vw panel: left edge at (60-55)/2 = 2.5vw
  //   To show ~15vw of the next image: current image right edge = 2.5+55 = 57.5vw,
  //     gap = 5vw, next image starts at 62.5vw → 60-62.5 = -2.5vw (just off screen, not great)
  //   Better: use 48vw images with 4vw gap → stride = 52vw
  //     Center 48vw in 60vw panel: left at 6vw, right at 54vw, gap 4vw, next starts at 58vw → 2vw peek ✓
  //
  // Actually let's go wider gap: image=50vw, gap=6vw, stride=56vw
  //   Center 50vw: left=5vw, right=55vw, gap=6vw, next starts at 61vw → just off edge (1vw hidden) — too tight
  //
  // Best approach: image=52vw, gap=4vw, stride=56vw
  //   paddingLeft to center first: (60-52)/2 = 4vw
  //   First image: 4vw → 56vw. Next starts at 60vw → exactly at right edge = ~4vw sneak peek visible
  //   translateX to advance: -56vw per image (stride)
  //   Total shift for last image: (numImages-1) * 56vw

  const IMG_W = 52;   // vw
  const GAP   = 4;    // vw
  const STRIDE = IMG_W + GAP; // 56vw
  const PADDING_LEFT = (60 - IMG_W) / 2; // 4vw — centers first image in 60vw panel

  const totalShift = (numImages - 1) * STRIDE;
  const trackX = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${totalShift}vw`]
  );

  // Lock body scroll while open; internal div handles scrolling
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, []);

  if (!project) return null;

  // Height: 100vh (initial sticky view) + 100vh per additional image to scroll through
  const totalHeight = `${(numImages) * 100 + 100}vh`;

  return (
    <>
      <style>{`
        .pd-scroll::-webkit-scrollbar { display: none; }
        .pd-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .pd-close {
          position: fixed; top: 2rem; right: 2rem; z-index: 210;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50%; width: 48px; height: 48px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: white; backdrop-filter: blur(12px);
          transition: background 0.2s;
        }
        .pd-close:hover { background: rgba(255,255,255,0.16); }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'fixed', inset: 0, zIndex: 200, backgroundColor: 'var(--bg-color)' }}
      >
        {/* Close — outside scroll so it stays fixed */}
        <button className="pd-close" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        {/* ── The scrollable container ── */}
        <div
          ref={scrollContainerRef}
          className="pd-scroll"
          style={{ position: 'absolute', inset: 0, overflowY: 'scroll' }}
        >
          {/* Tall scroll driver — useScroll watches this */}
          <div ref={outerRef} style={{ height: totalHeight, position: 'relative' }}>

            {/* Sticky split-screen */}
            <div style={{
              position: 'sticky', top: 0,
              height: '100vh', width: '100vw',
              display: 'flex', overflow: 'hidden',
            }}>

              {/* ── LEFT PANEL (40vw) ── */}
              <div style={{
                width: '40vw', flexShrink: 0, height: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: '6rem 4rem 4rem 5rem',
                background: 'var(--bg-color)', zIndex: 20, position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', right: 0, top: '10%', bottom: '10%',
                  width: '1px', background: 'rgba(255,255,255,0.07)',
                }} />

                <motion.p
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  style={{ color: project.color, fontSize: '0.75rem', fontWeight: 700,
                    letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}
                >
                  {project.category}
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 500,
                    lineHeight: 1, letterSpacing: '-2px', color: '#fff', marginBottom: '2rem' }}
                >
                  {project.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  style={{ fontSize: '1rem', lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.55)', marginBottom: '3rem', maxWidth: '360px' }}
                >
                  {project.description ||
                    'A full-stack project combining modern tooling with thoughtful design. Built from scratch with performance and user experience at its core.'}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  style={{ display: 'flex', gap: '3rem', marginBottom: '3rem' }}
                >
                  <div>
                    <h4 style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontWeight: 700,
                      letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      Tech Stack
                    </h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      {project.techStack?.split(',').map((t, i) => (
                        <span key={i} style={{ display: 'block' }}>{t.trim()}</span>
                      ))}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontWeight: 700,
                      letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      Links
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {project.links?.map((link, i) => (
                        <li key={i}>
                          <a href={link.url} target="_blank" rel="noreferrer"
                            style={{ color: project.color, textDecoration: 'none',
                              fontSize: '0.9rem', lineHeight: 2, opacity: 0.85 }}>
                            {link.label} ↗
                          </a>
                        </li>
                      )) ?? (
                        <>
                          <li><a href="#" style={{ color: project.color, textDecoration: 'none', fontSize: '0.9rem', lineHeight: 2, opacity: 0.85 }}>Live Site ↗</a></li>
                          <li><a href="#" style={{ color: project.color, textDecoration: 'none', fontSize: '0.9rem', lineHeight: 2, opacity: 0.85 }}>GitHub ↗</a></li>
                        </>
                      )}
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px',
                    fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  SCROLL TO EXPLORE
                </motion.div>
              </div>

              {/* ── RIGHT PANEL (60vw) — Horizontal gallery ── */}
              <div style={{
                width: '60vw', flexShrink: 0, height: '100%',
                overflow: 'hidden', position: 'relative',
                display: 'flex', alignItems: 'center',
              }}>
                {/* Left fade to blend into left panel */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: '48px',
                  background: 'linear-gradient(to right, var(--bg-color), transparent)',
                  zIndex: 10, pointerEvents: 'none',
                }} />
                {/* Right fade to hint at more content */}
                <div style={{
                  position: 'absolute', right: 0, top: 0, bottom: 0, width: '48px',
                  background: 'linear-gradient(to left, var(--bg-color), transparent)',
                  zIndex: 10, pointerEvents: 'none',
                }} />

                <motion.div style={{
                  x: trackX,
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${GAP}vw`,
                  paddingLeft: `${PADDING_LEFT}vw`,
                  height: '70vh',
                  willChange: 'transform',
                }}>
                  {images.map((img, index) => (
                    <div key={index} style={{
                      width: `${IMG_W}vw`,
                      height: '100%',
                      flexShrink: 0,
                      borderRadius: '24px',
                      border: '1px solid rgba(255,255,255,0.07)',
                      position: 'relative',
                      overflow: 'hidden',
                      background: 'rgba(255,255,255,0.03)',
                      boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
                    }}>
                      {/* Accent glow */}
                      <div style={{
                        position: 'absolute', bottom: 0, left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60%', height: '30%',
                        background: project.color,
                        filter: 'blur(60px)', opacity: 0.12,
                        borderRadius: '50%', pointerEvents: 'none',
                      }} />
                      {/* Counter chip */}
                      <div style={{
                        position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10,
                        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '20px', padding: '4px 12px',
                        fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px',
                      }}>
                        {String(index + 1).padStart(2, '0')} / {String(numImages).padStart(2, '0')}
                      </div>

                      {img ? (
                        <img src={img} alt={`${project.title} screenshot ${index + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'rgba(255,255,255,0.1)', fontSize: '1rem',
                          letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700,
                        }}>
                          {project.title}
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}