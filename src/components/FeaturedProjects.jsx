import { motion } from 'framer-motion';
import { playServoSound } from '../utils/playSound';

const projects = [
  {
    id: 1,
    title: 'Gundam E-commerce Experience',
    category: 'WebGL / Interactive',
    description: 'A 3D configurator and immersive shopping experience for custom mecha figures.',
    color: 'var(--accent-red)'
  },
  {
    id: 2,
    title: 'Velocity Data Dashboard',
    category: 'React / Data Viz',
    description: 'High-performance real-time analytics dashboard built with React and D3.js.',
    color: 'var(--accent-blue-bright)'
  },
  {
    id: 3,
    title: 'Neon Protocol',
    category: 'Web3 / DeFi',
    description: 'A sleek, decentralized exchange interface focusing on speed and usability.',
    color: 'var(--accent-yellow)'
  },
  {
    id: 4,
    title: 'Orbit 3D Portfolio',
    category: 'React / Three.js',
    description: 'An interactive portfolio utilizing advanced WebGL techniques.',
    color: 'var(--accent-white)'
  }
];

export default function FeaturedProjects() {
  return (
    <section className="section" style={{ padding: '4rem 0 2rem 0', backgroundColor: 'transparent' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{ fontSize: '3.5rem', marginBottom: '3rem' }}>
            <span className="text-white">FEATURED </span>
            <span className="text-yellow">PROJECTS</span>
          </h2>
        </motion.div>

        {/* Updated grid to strictly 2 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10, 
                boxShadow: '0px 20px 40px rgba(0,0,0,0.5)',
                transition: { duration: 0.3, ease: 'easeOut' } 
              }}
              onMouseEnter={() => playServoSound()}
              style={{
                padding: '2rem',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0, right: 0, width: '150px', height: '150px',
                background: project.color,
                filter: 'blur(80px)',
                opacity: 0.5,
                borderRadius: '50%',
                transform: 'translate(50%, -50%)',
                zIndex: 0
              }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                  height: '250px', 
                  width: '100%', 
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <span style={{ color: project.color, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    Preview
                  </span>
                </div>
                <p style={{ color: project.color, fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {project.category}
                </p>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
