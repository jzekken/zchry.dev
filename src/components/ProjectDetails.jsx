import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { X } from 'lucide-react';

export default function ProjectDetails({ project, onClose }) {
  const scrollContainerRef = useRef(null);
  const outerRef = useRef(null);

  // Automatically guarantee the cover image is the first one in the slider
  const additionalScreenshots = project?.screenshots?.length 
    ? project.screenshots 
    : [project?.image, project?.image, project?.image]; // Fallback repeats if no screenshots provided
    
  const images = [project?.image, ...additionalScreenshots].filter(Boolean);

  const numImages = images.length;

  // ONE continuous strip sliding left.
  // Strip layout (all in vw):
  //   [  left panel: 42vw  |  image 1: 100vw  |  image 2: 100vw  | ... ]
  //   Total strip width = 42 + numImages * 100 + small right padding
  //
  // At scroll=0: strip at x=0 → left panel fills screen left side, image 1 peeks on right
  // Scroll slides strip left until last image is centered.
  //
  // Phase 1: slide strip by 42vw → left panel exits, image 1 fills screen
  // Phase 2: slide by 100vw per additional image
  //
  // Total slide = 42vw + (numImages - 1) * 100vw
  // We map scrollYProgress [0,1] → [0vw, -totalSlide vw]

  const PANEL_W = 42;
  const IMG_W   = project.isMobile ? 35 : 100;
  
  // Calculate exact slide needed to perfectly center the first image on the screen
  const slideToCenterFirst = Math.max(0, PANEL_W - (50 - (IMG_W / 2)));
  const totalSlide = slideToCenterFirst + (numImages - 1) * IMG_W;

  const { scrollYProgress } = useScroll({
    target: outerRef,
    container: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  const stripX = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${totalSlide}vw`]
  );

  // Card border-radius: rounded while panel is visible, goes to 0 as image takes over
  const cardRadius = useTransform(
    scrollYProgress,
    [0, 0.15],
    [16, 0]
  );

  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = orig; };
  }, []);

  if (!project) return null;

  // Dynamic scroll height based on the physical translation distance for consistent scroll speed
  const totalHeight = `calc(100vh + ${totalSlide * 1.2}vw)`;

  return (
    <>
      <style>{`
        .pd-scroll::-webkit-scrollbar { display: none; }
        .pd-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .pd-close {
          position: fixed; top: 2rem; right: 2rem; z-index: 300;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50%; width: 48px; height: 48px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: white; backdrop-filter: blur(12px);
          transition: background 0.2s;
        }
        .pd-close:hover { background: rgba(255,255,255,0.18); }
        .launch-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #fff; color: #000;
          padding: 0.85rem 1.75rem; border-radius: 40px;
          border: none; font-size: 0.8rem; font-weight: 700;
          cursor: pointer; letter-spacing: 1px;
          transition: opacity 0.2s;
        }
        .launch-btn:hover { opacity: 0.85; }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          backgroundColor: 'var(--bg-color)',
          overflow: 'hidden',
        }}
      >
        <button className="pd-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* Scroll driver */}
        <div
          ref={scrollContainerRef}
          className="pd-scroll"
          style={{ position: 'absolute', inset: 0, overflowY: 'scroll' }}
        >
          <div ref={outerRef} style={{ height: totalHeight }}>

            {/* Sticky viewport */}
            <div style={{
              position: 'sticky', top: 0,
              height: '100vh', width: '100vw',
              overflow: 'hidden',
            }}>

              {/* ── THE FILM STRIP ── */}
              <motion.div
                style={{
                  x: stripX,
                  display: 'flex',
                  alignItems: 'stretch',
                  height: '100%',
                  width: `${PANEL_W + numImages * IMG_W + 10}vw`,
                  willChange: 'transform',
                }}
              >

                {/* ── LEFT PANEL ── */}
                <div style={{
                  width: `${PANEL_W}vw`,
                  flexShrink: 0,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '5rem 4vw 5rem 5vw',
                  position: 'relative',
                }}>
                  {/* Subtle right edge line */}
                  <div style={{
                    position: 'absolute', right: 0, top: '8%', bottom: '8%',
                    width: '1px', background: 'rgba(255,255,255,0.08)',
                  }} />

                  <motion.p
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    style={{
                      color: project.color, fontSize: '0.7rem', fontWeight: 700,
                      letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem',
                    }}
                  >
                    {project.category}
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.55 }}
                    style={{
                      fontSize: 'clamp(2.8rem, 4vw, 5rem)', fontWeight: 500,
                      lineHeight: 0.95, letterSpacing: '-2px',
                      color: '#fff', marginBottom: '1.75rem',
                    }}
                  >
                    {project.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    style={{
                      fontSize: '0.9rem', lineHeight: 1.75,
                      color: 'rgba(255,255,255,0.5)', marginBottom: '2rem',
                    }}
                  >
                    {project.description ||
                      'A full-stack project combining modern tooling with thoughtful design. Built from scratch with performance and user experience at its core.'}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    style={{ display: 'flex', gap: '2.5rem', marginBottom: '2.5rem' }}
                  >
                    <div>
                      <p style={{
                        color: 'rgba(255,255,255,0.25)', fontSize: '0.65rem', fontWeight: 700,
                        letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem',
                      }}>Tech Stack</p>
                      {project.techStack?.split(',').map((t, i) => (
                        <p key={i} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.9 }}>
                          {t.trim()}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p style={{
                        color: 'rgba(255,255,255,0.25)', fontSize: '0.65rem', fontWeight: 700,
                        letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem',
                      }}>Links</p>
                      {(project.links || [{ label: 'Live Site', url: '#' }, { label: 'GitHub', url: '#' }]).map((l, i) => (
                        <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{
                          display: 'block', color: project.color, textDecoration: 'none',
                          fontSize: '0.85rem', lineHeight: 1.9, opacity: 0.85,
                        }}>
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                  >
                    <button className="launch-btn">
                      <span style={{
                        width: '7px', height: '7px', borderRadius: '50%',
                        background: project.color, display: 'inline-block', flexShrink: 0,
                      }} />
                      LAUNCH PROJECT
                    </button>
                  </motion.div>

                  {/* Scroll hint */}
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    style={{
                      position: 'absolute', bottom: '2.5rem', left: '5vw',
                      display: 'flex', alignItems: 'center', gap: '8px',
                      color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem',
                      letterSpacing: '2px', textTransform: 'uppercase',
                    }}
                  >
                    <motion.svg
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                      width="14" height="14" viewBox="0 0 14 14" fill="none"
                    >
                      <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                    Scroll to explore
                  </motion.div>
                </div>

                {/* ── IMAGE CARDS ── */}
                {images.map((img, index) => (
                  <motion.div
                    key={index}
                    style={{
                      width: `${IMG_W}vw`,
                      flexShrink: 0,
                      height: '100%',
                      padding: project.isMobile ? '10vh 2vw' : '8vh 6vw',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    {/* Accent glow behind image */}
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: project.isMobile ? '25vw' : '40vw', 
                      height: project.isMobile ? '25vw' : '40vw',
                      background: project.color,
                      filter: 'blur(100px)', opacity: 0.15,
                      pointerEvents: 'none', zIndex: 0,
                      borderRadius: '50%'
                    }} />

                    {img ? (
                      img.toLowerCase().endsWith('.mp4') || img.toLowerCase().endsWith('.webm') ? (
                        <video
                          src={img}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          style={{
                            maxWidth: '100%', 
                            maxHeight: '100%',
                            objectFit: 'contain',
                            borderRadius: '32px',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                            position: 'relative', zIndex: 1,
                          }}
                        />
                      ) : (
                        <img
                          src={img}
                          alt={`${project.title} screenshot ${index + 1}`}
                          loading="lazy"
                          style={{
                            maxWidth: '100%', 
                            maxHeight: '100%',
                            objectFit: 'contain',
                            borderRadius: '32px',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                            position: 'relative', zIndex: 1,
                          }}
                        />
                      )
                    ) : (
                      <div style={{
                        width: '100%', height: '100%',
                        borderRadius: '32px',
                        background: '#0a0a0a',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'rgba(255,255,255,0.05)', fontSize: '4rem',
                        fontWeight: 800, letterSpacing: '-2px',
                        position: 'relative', zIndex: 1,
                        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                      }}>
                        {project.title}
                      </div>
                    )}

                    {/* Counter pill */}
                    <div style={{
                      position: 'absolute', bottom: '10vh', right: project.isMobile ? '4vw' : '8vw', zIndex: 2,
                      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '20px', padding: '4px 14px',
                      fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px',
                    }}>
                      {String(index + 1).padStart(2, '0')} / {String(numImages).padStart(2, '0')}
                    </div>
                  </motion.div>
                ))}

              </motion.div>

            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}