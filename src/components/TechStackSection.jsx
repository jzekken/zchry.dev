import React from 'react';
import { Code2, Monitor, Cpu, Terminal, Database, Palette, Settings, Globe, Server } from 'lucide-react';
import CircularGallery from './CircularGallery/CircularGallery';

export default function TechStackSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}>
      
      {/* Tech Stack / Arsenal */}
      <section className="section" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#fff' }}>Tech Stack & Arsenal</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            { name: 'React', icon: <Monitor size={20}/> },
            { name: 'Vite', icon: <Terminal size={20}/> },
            { name: 'Three.js', icon: <Globe size={20}/> },
            { name: 'Framer Motion', icon: <Palette size={20}/> },
            { name: 'Node.js', icon: <Server size={20}/> },
            { name: 'Tailwind CSS', icon: <Code2 size={20}/> },
            { name: 'WebGL', icon: <Cpu size={20}/> },
            { name: 'C++', icon: <Settings size={20}/> },
            { name: 'Python', icon: <Database size={20}/> }
          ].map(tech => (
            <div key={tech.name} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ccc',
              fontSize: '1.2rem',
              fontWeight: '600',
              backgroundColor: 'rgba(255, 255, 255, 0.05)'
            }}>
              {tech.icon}
              {tech.name}
            </div>
          ))}
        </div>
      </section>

      {/* The Journey / Hackathons */}
      <section className="section" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '0 2rem 1rem 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: '#fff', marginBottom: '1rem' }}>The Journey</h2>
          <p style={{ color: '#aaa', fontSize: '1.2rem' }}>Hackathons, Conventions & Events</p>
        </div>
        
        {/* Circular Gallery Container */}
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
        </div>
      </section>
      
    </div>
  );
}
