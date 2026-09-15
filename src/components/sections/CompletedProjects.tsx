import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

export function CompletedProjects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-walnut, #4A1F12)',
    padding: '80px 20px',
    color: 'var(--color-text-cream, #F5F1E8)',
    fontFamily: '"Inter", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '40px',
    maxWidth: '800px',
  };

  const overlineStyle: React.CSSProperties = {
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '16px',
    display: 'block',
  };

  const h2Style: React.CSSProperties = {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 700,
    marginBottom: '20px',
    lineHeight: 1.2,
    color: 'var(--color-text-cream, #F5F1E8)',
  };

  const subtitleStyle: React.CSSProperties = {
    color: 'var(--color-text-muted-warm, #C8BDB3)',
    fontSize: '1.1rem',
    lineHeight: 1.6,
  };

  const statsRowStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '24px',
    marginBottom: '60px',
    padding: '0 20px',
  };

  const statTextStyle: React.CSSProperties = {
    color: '#D4AF37',
    fontSize: '0.9rem',
    fontWeight: 500,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  };

  const projects = [
    {
      id: 1,
      name: 'TechStar Solutions',
      location: 'Gachibowli, Hyderabad',
      industry: 'IT/SaaS',
      seats: '120 Seats',
      timeline: '6 Weeks',
      products: 'Workstations, Chairs, Conference Tables',
      gradient: 'linear-gradient(135deg, #5A2919 0%, #32140D 100%)',
      // Realistic temporary AI reference photo — replace with real project photo when available
      image: '/assets/projects/project-techstar.jpg',
    },
    {
      id: 2,
      name: 'Greenfield Capital',
      location: 'Banjara Hills, Hyderabad',
      industry: 'Finance',
      seats: '45 Seats',
      timeline: '3 Weeks',
      products: 'Executive Desks, Cabins, Storage',
      gradient: 'linear-gradient(135deg, #6B3522 0%, #4A1F12 100%)',
      // Realistic temporary AI reference photo — replace with real project photo when available
      image: '/assets/projects/project-greenfield.jpg',
    },
    {
      id: 3,
      name: 'Nova Design Studio',
      location: 'Kondapur, Hyderabad',
      industry: 'Creative Agency',
      seats: '30 Seats',
      timeline: '2 Weeks',
      products: 'Open Plan, Collaborative Tables',
      gradient: 'linear-gradient(135deg, #5A2919 0%, #1E0D08 100%)',
      // Realistic temporary AI reference photo — replace with real project photo when available
      image: '/assets/projects/project-novadesign.jpg',
    }
  ];

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
    width: '100%',
    maxWidth: '1200px',
  };

  return (
    <section style={containerStyle}>
      <motion.div 
        style={headerStyle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span style={overlineStyle}>Portfolio</span>
        <h2 style={h2Style}>Completed Projects</h2>
        <p style={subtitleStyle}>
          Explore how we've transformed bare spaces into thriving, productive environments for leading enterprises.
        </p>
      </motion.div>

      <motion.div 
        style={statsRowStyle}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span style={statTextStyle}>3 Featured Projects</span>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
        <span style={statTextStyle}>175+ Seats Installed</span>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
        <span style={statTextStyle}>3 Industries</span>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
        <span style={statTextStyle}>100% On-Time</span>
      </motion.div>

      <div style={gridStyle}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              backgroundColor: 'var(--color-walnut-light, #5A2919)',
              borderRadius: '16px',
              border: '1px solid',
              borderColor: hoveredIndex === index ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.15)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: hoveredIndex === index ? '0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.15)' : '0 4px 20px rgba(0,0,0,0.25)',
              transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
          >
            <div style={{
              width: '100%',
              height: '240px',
              backgroundColor: '#111',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {project.image && (
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    zIndex: 0,
                  }}
                />
              )}
              {/* Dark overlay to keep industry badge readable */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 100%)',
                zIndex: 1,
              }} />
              <div style={{
                position: 'relative',
                zIndex: 2,
                padding: '16px',
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}>
                  {project.industry}
                </div>
              </div>
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 8px 0', color: '#fff' }}>
                {project.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', marginBottom: '24px', fontSize: '0.9rem' }}>
                <MapPin size={14} />
                <span>{project.location}</span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '24px',
              }}>
                <div>
                  <div style={{ color: '#D4AF37', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '4px' }}>Size</div>
                  <div style={{ color: '#ddd', fontSize: '0.9rem', fontWeight: 500 }}>{project.seats}</div>
                </div>
                <div>
                  <div style={{ color: '#D4AF37', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '4px' }}>Timeline</div>
                  <div style={{ color: '#ddd', fontSize: '0.9rem', fontWeight: 500 }}>{project.timeline}</div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ color: '#D4AF37', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '4px' }}>Products Supplied</div>
                  <div style={{ color: '#ddd', fontSize: '0.9rem', fontWeight: 500 }}>{project.products}</div>
                </div>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <a href="/gallery" style={{
                  color: '#D4AF37',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'gap 0.3s ease',
                }}>
                  View Project <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default CompletedProjects;
