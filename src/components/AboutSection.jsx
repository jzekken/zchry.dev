import Lanyard from './Lanyard/Lanyard';

export default function AboutSection() {
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
            <Lanyard position={[0, 0, 18]} gravity={[0, -40, 0]} />
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
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc' }}>
            I am looking for an opportunity to grow my technical foundation while helping build solutions that have a positive, real-world impact.
          </p>
        </div>

      </div>
    </section>
  );
}
