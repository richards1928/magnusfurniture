import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function WorkspaceInspiration() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#0C0A08',
    padding: '80px 20px',
    color: '#ffffff',
    fontFamily: '"Inter", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '60px',
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
  };

  const subtitleStyle: React.CSSProperties = {
    color: '#a0a0a0',
    fontSize: '1.1rem',
    lineHeight: 1.6,
  };
  
  // Custom bento grid via media queries isn't fully possible with only inline styles for auto placement,
  // but we can simulate it with flexbox or specific column spans. Since we cannot use CSS classes,
  // we'll use a responsive flex approach or grid with inline grid-column values based on window size.
  // Since we don't have window size hooks here easily, we'll use standard grid and just let them flow,
  // but use a desktop-first approach for spans with a wrapper.
  
  // Actually, we can just use flexbox for a bento-like layout that wraps.
  
  const cards = [
    {
      id: 1,
      title: 'Modern Startup Office',
      category: 'Open Plan',
      gradient: 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%)',
      colSpan: 2,
    },
    {
      id: 2,
      title: 'Executive Suite',
      category: 'Private Cabin',
      gradient: 'linear-gradient(135deg, #3E2723 0%, #1B0000 100%)',
      colSpan: 1,
    },
    {
      id: 3,
      title: 'Conference Room',
      category: 'Meeting Space',
      gradient: 'linear-gradient(135deg, #37474F 0%, #263238 100%)',
      colSpan: 1,
    },
    {
      id: 4,
      title: 'Reception Lobby',
      category: 'Lounge',
      gradient: 'linear-gradient(135deg, #4E342E 0%, #3E2723 100%)',
      colSpan: 2,
    },
  ];

  const statsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '32px',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '16px',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    maxWidth: '1200px',
    width: '100%',
    marginBottom: '60px',
  };

  const statItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };
  
  const statDividerStyle: React.CSSProperties = {
    width: '1px',
    height: '24px',
    backgroundColor: 'rgba(255,255,255,0.1)',
  };

  const statTextStyle: React.CSSProperties = {
    color: '#e0e0e0',
    fontSize: '0.95rem',
    fontWeight: 500,
  };

  const buttonStyle: React.CSSProperties = {
    padding: '16px 32px',
    border: '1px solid #D4AF37',
    backgroundColor: 'transparent',
    color: '#D4AF37',
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: '30px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
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
        <span style={overlineStyle}>Inspiration</span>
        <h2 style={h2Style}>Workspace Inspiration</h2>
        <p style={subtitleStyle}>
          Discover curations designed for productivity, collaboration, and executive presence.
        </p>
      </motion.div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        width: '100%',
        maxWidth: '1200px',
        marginBottom: '40px'
      }}>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              flex: card.colSpan === 2 ? '1 1 calc(60% - 12px)' : '1 1 calc(40% - 12px)',
              minWidth: '280px',
              height: '300px',
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              background: card.gradient,
            }}
          >
            <motion.div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                zIndex: 1,
              }}
              animate={{
                opacity: hoveredIndex === index ? 0.8 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div 
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                padding: '30px',
                zIndex: 2,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <div>
                <span style={{
                  color: '#D4AF37',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '8px',
                }}>
                  {card.category}
                </span>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  margin: 0,
                  color: '#fff',
                }}>
                  {card.title}
                </h3>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#D4AF37',
                  borderRadius: '20px',
                  color: '#000',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Explore <ArrowRight size={14} />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        style={statsContainerStyle}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div style={statItemStyle}><span style={statTextStyle}>17+ Projects Completed</span></div>
        <div style={statDividerStyle}></div>
        <div style={statItemStyle}><span style={statTextStyle}>500+ Workstations</span></div>
        <div style={statDividerStyle}></div>
        <div style={statItemStyle}><span style={statTextStyle}>100% Client Satisfaction</span></div>
        <div style={statDividerStyle}></div>
        <div style={statItemStyle}><span style={statTextStyle}>Hyderabad & Beyond</span></div>
      </motion.div>

      <motion.a 
        href="/gallery"
        style={buttonStyle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
      >
        View Full Gallery <ArrowRight size={18} />
      </motion.a>
    </section>
  );
}

export default WorkspaceInspiration;
