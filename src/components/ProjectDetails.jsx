import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { X } from 'lucide-react';

export default function ProjectDetails({ project, onClose }) {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const images = project?.screenshots || [project?.image, project?.image, project?.image, project?.image];
  const numImages = images.length;
  
  // Right Panel: 60vw
  // Image: 55vw wide, 65vh tall (landscape, similar to Lusion reference)
  // Track paddingLeft: 32.5vw. This positions the first 55vw image such that exactly half (27.5vw) is visible in the 60vw right panel.
  // To center the first image in the 60vw panel, its left edge needs to be at 2.5vw.
  // So it translates from 32.5vw to 2.5vw (a movement of -30vw).
  // Distance between images is 55vw (image) + 5vw (gap) = 60vw.
  const maxScrollVw = 30 + (numImages - 1) * 60;
  const trackX = useTransform(scrollYProgress, [0, 1], ["0vw", `-${maxScrollVw}vw`]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  if (!project) return null;

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] no-scrollbar"
        style={{
          backgroundColor: 'var(--bg-color)', 
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 100,
          overflowY: 'auto'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'fixed',
            top: '2rem',
            right: '2rem',
            zIndex: 110,
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            backdropFilter: 'blur(10px)'
          }}
        >
          <X size={24} />
        </button>

        {/* The tall scrollable container */}
        <div ref={targetRef} style={{ height: `${numImages * 100}vh`, position: 'relative' }}>
          
          {/* The sticky viewport (Split Screen) */}
          <div style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            width: '100vw',
            overflow: 'hidden'
          }}>
            
            {/* 1. LEFT SIDE - Text Panel (40%) */}
            <div style={{
              width: '40vw',
              height: '100%',
              padding: '6rem 4rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              zIndex: 20,
              background: 'var(--bg-color)' // Ensures clean separation
            }}>
              <h1 style={{ fontSize: '4.5rem', marginBottom: '2rem', color: project.color, textTransform: 'none', fontWeight: 500, letterSpacing: '-1px', lineHeight: 1 }}>
                {project.title}
              </h1>
              
              <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '3rem', color: '#ccc' }}>
                {project.description || 'This is a self-initiated project built around a deliberately ridiculous idea: presenting a simple concept as a serious AI era product launch. We treated it as a full campaign, combining premium visual production with storytelling.'}
              </p>

              <div style={{ display: 'flex', gap: '4rem', marginBottom: 'auto' }}>
                <div>
                  <h4 style={{ color: 'var(--accent-yellow)', fontSize: '0.8rem', marginBottom: '1rem', letterSpacing: '1px' }}>SERVICES</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#aaa', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    {project.services?.map((service, i) => (
                      <li key={i}>{service}</li>
                    )) || (
                      <>
                        <li>Concept</li>
                        <li>Web Design</li>
                        <li>Web Development</li>
                        <li>3D Design</li>
                      </>
                    )}
                  </ul>
                </div>
                <div>
                  <h4 style={{ color: 'var(--accent-yellow)', fontSize: '0.8rem', marginBottom: '1rem', letterSpacing: '1px' }}>LINKS</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#aaa', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    {project.links?.map((link, i) => (
                      <li key={i}><a href={link.url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{link.label}</a></li>
                    )) || (
                      <>
                        <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Live Site</a></li>
                        <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a></li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <button style={{
                background: 'var(--text-color)',
                color: 'var(--bg-color)',
                padding: '1rem 2rem',
                borderRadius: '30px',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '2rem'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: project.color, display: 'inline-block' }}></span>
                LAUNCH PROJECT
              </button>
            </div>

            {/* 2. RIGHT SIDE - Image Gallery (60%) */}
            <div style={{
              width: '60vw',
              height: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden'
            }}>
              
              <motion.div style={{
                x: trackX,
                display: 'flex',
                alignItems: 'center',
                gap: '5vw',
                paddingLeft: '32.5vw', // Pushes the first 55vw image so exactly half is visible in this 60vw container
                height: '70vh',
                willChange: 'transform'
              }}>
                
                {images.map((img, index) => (
                  <div key={index} style={{
                    width: '55vw',
                    height: '100%',
                    flexShrink: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                    borderRadius: '32px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 30px 60px rgba(0,0,0,0.6), inset 0 0 40px rgba(255,255,255,0.02)`
                  }}>
                    <div style={{ position: 'absolute', top: '2.5rem', left: '3rem', fontWeight: 800, fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', letterSpacing: '2px', zIndex: 10 }}>
                      {project.title.toUpperCase()}
                    </div>
                    {img ? (
                      <img 
                        src={img} 
                        alt={`${project.title} mockup ${index + 1}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ color: '#555', fontSize: '2rem' }}>No Image</div>
                    )}
                  </div>
                ))}

              </motion.div>
            </div>

          </div>
        </div>
      </motion.div>
    </>
  );
}
