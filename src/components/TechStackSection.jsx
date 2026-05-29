import React from 'react';
import { Code2, Monitor, Cpu, Terminal, Database, Palette, Settings, Globe, Server } from 'lucide-react';
import CircularGallery from './CircularGallery/CircularGallery';

const techCategories = [
  {
    title: 'Programming',
    skills: [
      { name: 'Python', slug: 'python', color: '3776AB' },
      { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
      { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
      { name: 'C', slug: 'c', color: 'A8B9CC' },
      { name: 'C++', slug: 'cplusplus', color: '00599C' },
      { name: 'C#', customImage: '/Logo_C_sharp.svg.png' },
      { name: 'Dart', slug: 'dart', color: '0175C2' },
      { name: 'Bash', slug: 'gnubash', color: '4EAA25' },
    ]
  },
  {
    title: 'Frontend & Mobile',
    skills: [
      { name: 'React', slug: 'react', color: '61DAFB' },
      { name: 'Flutter', slug: 'flutter', color: '02569B' }
    ]
  },
  {
    title: 'Backend & AI',
    skills: [
      { name: 'Node.js', slug: 'nodedotjs', color: '339933' },
      { name: 'Express', slug: 'express', color: 'ffffff' },
      { name: 'FastAPI', slug: 'fastapi', color: '009688' },
      { name: 'TensorFlow', slug: 'tensorflow', color: 'FF6F00' },
      { name: 'PyTorch', slug: 'pytorch', color: 'EE4C2C' },
      { name: 'OpenCV', slug: 'opencv', color: '5C3EE8' }
    ]
  },
  {
    title: 'Databases & Cloud',
    skills: [
      { name: 'Firebase', slug: 'firebase', color: 'FFCA28' },
      { name: 'Supabase', slug: 'supabase', color: '3ECF8E' },
      { name: 'Neo4j', slug: 'neo4j', color: '4581C3' }
    ]
  }
];

export default function TechStackSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}>
      
      {/* Tech Stack / Arsenal */}
      <section className="section" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '3rem' }}>
          <span className="text-white">TECH </span>
          <span className="text-yellow">STACK</span>
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {techCategories.map((category, idx) => (
            <div key={idx} style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <h3 style={{ color: '#fff', marginBottom: '2rem', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {category.title}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
                {category.skills.map(skill => (
                  <div key={skill.name} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '60px',
                    transition: 'transform 0.2s',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <img 
                      src={skill.customImage ? skill.customImage : `https://cdn.simpleicons.org/${skill.slug}/${skill.color}`} 
                      alt={skill.name} 
                      style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                    />
                    <span style={{ color: '#888', fontSize: '0.75rem', textAlign: 'center', fontWeight: 'bold' }}>{skill.name}</span>
                  </div>
                ))}
              </div>
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
          <CircularGallery 
            items={[
              { image: '/gallery/cebi.webp', text: 'CEBI' },
              { image: '/gallery/ibpap.webp', text: 'IBPAP' },
              { image: '/gallery/ncr.webp', text: 'NCR' },
              { image: '/gallery/projects.webp', text: 'PROJECTS' }
            ]} 
            bend={3} 
            textColor="#ffffff" 
            borderRadius={0.05} 
          />
        </div>
      </section>
      
    </div>
  );
}
