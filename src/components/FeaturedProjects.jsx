import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playServoSound } from '../utils/playSound';
import ProjectDetails from './ProjectDetails';

const projects = [
  {
    id: 1,
    title: 'TuklaScope',
    category: 'AI-Powered Career Discovery',
    techStack: 'Flutter (Dart), FastAPI (Python), Neo4j, Supabase',
    color: 'var(--accent-blue-bright)',
    role: 'Project Manager | Frontend Developer',
    description: 'A cross-platform mobile app that utilizes AI object recognition to help users explore and discover potential career paths based on their real-world environment and interests.',
    links: [{ label: 'GitHub', url: 'https://github.com/jzekken/tuklascope_mobile.git' }],
    isMobile: true,
    image: '/projects/tuklascope/Tuklascope.webp',
    screenshots: [
      '/projects/tuklascope/1.webp',
      '/projects/tuklascope/2.webp',
      '/projects/tuklascope/3.webp',
      '/projects/tuklascope/4.webp',
      '/projects/tuklascope/5.webp',
      '/projects/tuklascope/6.webp',
      '/projects/tuklascope/7.webp',
      '/projects/tuklascope/8.webp',
      '/projects/tuklascope/9.webp'
    ]
  },
  {
    id: 2,
    title: 'LaagtabAI',
    category: 'AI-Integrated Travel Assistant',
    techStack: 'React Native, FastAPI, Firebase',
    color: 'var(--accent-yellow)',
    role: 'Full-Stack Developer',
    description: 'A smart application leveraging artificial intelligence to generate personalized travel itineraries and local recommendations, making exploration easier and more accessible for users.',
    links: [{ label: 'GitHub', url: 'https://github.com/D4rkbyte-Hackathon/Laag-ta-bAI.git' }],
    image: '/projects/laagtabai/Laag ta bAI.webp',
    screenshots: [
      '/projects/laagtabai/8.webp',
      '/projects/laagtabai/9.webp',
      '/projects/laagtabai/10.webp',
      '/projects/laagtabai/last.webp'
    ]
  },
  {
    id: 3,
    title: 'M.O.R.T.',
    category: 'AI-Powered Centralized Study Hub',
    techStack: 'React, Node.js, Firebase',
    color: 'var(--accent-red)',
    role: 'Full-Stack Developer',
    description: 'A centralized digital hub for managing, organizing, and accessing essential online resources and tools. A comprehensive educational platform that extracts text from document uploads to create interactive study materials. It features AI-driven text summarization, custom quiz and flashcard generation, a contextual chatbot for querying notes, and an integrated calendar for task management.',
    links: [{ label: 'GitHub', url: 'https://github.com/jzekken/Mort.git' }],
    launchUrl: 'https://mort-352n.onrender.com',
    image: '/projects/mort/mort.webp',
    screenshots: [
      '/projects/mort/Mort.mp4',
      '/projects/mort/mort.webp'
    ]
  },
  {
    id: 4,
    title: 'chessfps',
    category: 'Webapp Game',
    techStack: 'React, Node.js',
    color: '#33ff88',
    role: 'Software Engineer',
    description: 'A chess game with FPS mechanics. You miss, you lose the piece. Built using React and Node.js, this highly experimental webapp fuses the strategic depth of traditional chess with the mechanical skill and adrenaline of a first-person shooter. Every capture requires a perfectly aimed shot, transforming a quiet board game into a high-stakes arena.',
    links: [
      { label: 'GitHub', url: 'https://github.com/jzekken/chessfps.git' },
      { label: 'Play Now', url: 'https://chessfps.vercel.app/' }
    ],
    launchUrl: 'https://chessfps.vercel.app/',
    image: '/projects/chessfps/chessfps.webp',
    screenshots: [
      '/projects/chessfps/1.webp',
      '/projects/chessfps/2.webp',
      '/projects/chessfps/3.webp',
      '/projects/chessfps/4.webp',
      '/projects/chessfps/5.webp'
    ]
  }
];

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState(null);

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
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, delay: index * 0.2 }
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              whileHover={{ 
                scale: 1.05, 
                y: -10, 
                boxShadow: '0px 20px 40px rgba(0,0,0,0.5)',
                filter: ["blur(0px)", "blur(6px)", "blur(0px)"]
              }}
              onMouseEnter={() => playServoSound()}
              onClick={() => setSelectedProject(project)}
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
                  border: '1px solid rgba(255,255,255,0.1)',
                  overflow: 'hidden'
                }}>
                  {project.image ? (
                    <img src={project.image} alt={project.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ color: project.color, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
                      Preview
                    </span>
                  )}
                </div>
                <p style={{ color: project.color, fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {project.category}
                </p>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>{project.title}</h3>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
                  <strong style={{ color: '#fff' }}>Tech Stack:</strong> {project.techStack}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetails 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
