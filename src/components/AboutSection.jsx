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
        <div style={{ flex: '1 1 400px', height: '700px', minWidth: '300px', position: 'relative', marginTop: '-80px' }}>
          {/* Zoomed in camera position to make it bigger, moved Y down so string starts at top */}
          <Lanyard position={[0, 0, 18]} gravity={[0, -40, 0]} />
        </div>

        {/* Text Container */}
        <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#fff' }}>About Me</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#ccc', marginBottom: '1rem' }}>
            Hi there! I'm John Zachary. This is a placeholder text for my about section.
            I'll be updating this with my actual journey, background, and passion for Computer Engineering soon!
          </p>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#ccc' }}>
            For now, feel free to grab and swing the 3D lanyard badge around. It's fully interactive and powered by Rapier physics!
          </p>
        </div>

      </div>
    </section>
  );
}
