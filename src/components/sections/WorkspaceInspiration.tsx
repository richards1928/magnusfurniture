import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const spaces = [
  { title: 'Modern Startup', label: 'Open Plan Workspace', gradient: 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%)' },
  { title: 'Corporate HQ', label: 'Executive Suite', gradient: 'linear-gradient(135deg, #3E2723 0%, #1B0000 100%)' },
  { title: 'Meeting Room', label: 'Collaborative Spaces', gradient: 'linear-gradient(135deg, #37474F 0%, #263238 100%)' },
  { title: 'Reception', label: 'First Impressions', gradient: 'linear-gradient(135deg, #4E342E 0%, #3E2723 100%)' },
];

export function WorkspaceInspiration() {
  return (
    <section style={{ background: 'var(--color-warm-white)', padding: 'var(--space-24) 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-accent)',
            marginBottom: 16,
          }}>Inspiration</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300, color: 'var(--color-dark)', marginBottom: 20,
          }}>
            Workspace <span style={{ fontWeight: 600 }}>Inspiration</span>
          </h2>
          <p style={{
            fontSize: 'var(--fs-body-lg)', color: 'var(--color-gray-500)',
            maxWidth: 520, margin: '0 auto', lineHeight: 'var(--lh-relaxed)',
          }}>
            Explore environments we have transformed into productive, beautiful, and functional spaces.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: '300px 300px',
          gap: 16,
        }} className="inspiration-grid">
          {spaces.map((space, i) => (
            <motion.div
              key={space.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                gridColumn: i === 0 ? 'span 2' : i === 3 ? 'span 2' : 'span 1',
                borderRadius: 'var(--radius-lg)',
                background: space.gradient,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              className="inspiration-card"
            >
              {/* Hover overlay */}
              <div className="inspiration-overlay" style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                transition: 'opacity 0.4s ease',
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '32px',
                zIndex: 2,
              }}>
                <div style={{
                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'rgba(212, 175, 55, 0.9)',
                  marginBottom: 8,
                }}>{space.label}</div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: i === 0 || i === 3 ? 'var(--fs-h3)' : 'var(--fs-body-lg)',
                  fontWeight: 600, color: '#fff',
                }}>{space.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/gallery" style={{
            fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--color-dark)',
            borderBottom: '1px solid var(--color-dark)',
            paddingBottom: 4, textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}>
            View Full Gallery
          </Link>
        </div>
      </div>

      <style>{`
        .inspiration-card:hover .inspiration-overlay {
          opacity: 0.9 !important;
        }
        @media (max-width: 768px) {
          .inspiration-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto !important;
          }
          .inspiration-grid > * {
            grid-column: span 1 !important;
            min-height: 220px;
          }
        }
      `}</style>
    </section>
  );
}
