import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const data = new FormData();
    // REPLACE THIS with the key generated from https://web3forms.com/
    data.append("access_key", "YOUR_ACCESS_KEY_HERE"); 
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          
          {submitStatus === 'success' && (
            <p style={{ color: '#3ECF8E', textAlign: 'center', marginTop: '1rem', fontWeight: 'bold' }}>
              Message sent successfully! I'll get back to you soon.
            </p>
          )}
          {submitStatus === 'error' && (
            <p style={{ color: 'var(--accent-red)', textAlign: 'center', marginTop: '1rem', fontWeight: 'bold' }}>
              Oops! Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
