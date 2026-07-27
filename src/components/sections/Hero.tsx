import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} style={{
      position: 'relative',
      height: '100vh',
      minHeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: '#0C0A09',
    }}>
      {/* Parallax background layer */}
      <motion.div style={{
        position: 'absolute', inset: 0, y: bgY, scale,
        background: 'linear-gradient(160deg, #1A1612 0%, #2A2219 30%, #1A1612 60%, #0C0A09 100%)',
      }} />

      {/* Warm light overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 70% 40%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 20% 80%, rgba(212, 175, 55, 0.04) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <motion.div style={{ opacity, position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 900, padding: '0 var(--side-padding)' }}>
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(212, 175, 55, 0.9)',
            marginBottom: 32,
          }}
        >
          <span style={{ width: 24, height: 1, background: 'rgba(212, 175, 55, 0.5)' }} />
          Premium Office Furniture
          <span style={{ width: 24, height: 1, background: 'rgba(212, 175, 55, 0.5)' }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            fontWeight: 300,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 32,
          }}
        >
          Transforming Workspaces.<br />
          <span style={{ fontWeight: 600 }}>Inspiring Productivity.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.8,
            maxWidth: 600,
            margin: '0 auto 48px',
          }}
        >
          Premium office furniture solutions designed to elevate modern businesses through comfort, functionality, and timeless design.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 64 }}
        >
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '16px 36px', background: '#FFFFFF', color: '#0C0A09',
              borderRadius: 'var(--radius-full)', fontSize: '0.9rem',
              fontWeight: 600, letterSpacing: '0.05em', transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Explore Collections <ArrowRight size={16} />
            </span>
          </Link>
          <Link to="/custom-furniture" style={{ textDecoration: 'none' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '16px 36px', background: 'transparent', color: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-full)',
              fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em',
              transition: 'all 0.3s ease', cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            >
              Launch Workspace Designer
            </span>
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            gap: 32, flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="rgba(212, 175, 55, 0.9)" color="rgba(212, 175, 55, 0.9)" />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>4.9 Google Rating</span>
          </div>
          <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>17+ Verified Reviews</span>
          <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Premium Office Specialists</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} color="rgba(255,255,255,0.3)" />
        </motion.div>
      </motion.div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          section { min-height: 100svh !important; }
        }
      `}</style>
    </section>
  );
}
