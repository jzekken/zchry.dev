import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Success! Your message has been sent.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" style={{
      padding: '4rem 0',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
          <span className="text-white">GET IN </span>
          <span className="text-yellow">TOUCH</span>
        </h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Have a project in mind or just want to say hi? Drop me a message below.
        </p>
        
        <form onSubmit={handleSubmit} className="glass" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          padding: '2.5rem',
        }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-white)', fontWeight: 600 }}>Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                color: 'white',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-yellow)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
            />
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-white)', fontWeight: 600 }}>Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                color: 'white',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-yellow)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
            />
          </div>
          <div>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-white)', fontWeight: 600 }}>Message</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                color: 'white',
                outline: 'none',
                fontFamily: 'inherit',
                resize: 'vertical',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-yellow)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
            ></textarea>
          </div>
          <button type="submit" style={{
            padding: '1rem',
            backgroundColor: 'var(--accent-yellow)',
            color: 'black',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '0.5rem',
            textTransform: 'uppercase'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(252, 213, 63, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
