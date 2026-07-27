import { motion } from 'framer-motion';
import { ArrowRight, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DesignYourOwn() {
  return (
    <section style={{
      background: 'var(--color-cream)', padding: 'var(--space-24) 0',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="container designer-grid" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-16)', alignItems: 'center',
        position: 'relative',
      }}>
        {/* Left — Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 'var(--radius-full)',
            background: 'var(--color-primary-bg)', color: 'var(--color-primary)',
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', marginBottom: 24,
          }}>
            <Wand2 size={13} />
            Workspace Designer
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300, color: 'var(--color-dark)',
            lineHeight: 'var(--lh-tight)', marginBottom: 24,
          }}>
            Design Your Ideal<br />
            <span style={{ fontWeight: 600 }}>Workspace in 3D</span>
          </h2>

          <p style={{
            fontSize: 'var(--fs-body-lg)', color: 'var(--color-gray-500)',
            lineHeight: 'var(--lh-relaxed)', maxWidth: 480, marginBottom: 40,
          }}>
            Use our interactive configurator to build custom furniture from scratch. Choose components, materials, and dimensions — see it all come to life in real time.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
            <Link to="/custom-furniture" style={{ textDecoration: 'none' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 36px', background: 'var(--color-dark)', color: '#fff',
                borderRadius: 'var(--radius-full)', fontSize: '0.9rem',
                fontWeight: 600, letterSpacing: '0.05em', cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Start Designing <ArrowRight size={16} />
              </span>
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 32 }}>
            {[
              { value: 'Drag & Drop', label: 'Easy builder' },
              { value: 'Smart Snap', label: 'Auto-alignment' },
              { value: 'Save & Share', label: 'Export designs' },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--color-primary)', marginBottom: 4 }}>{f.value}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-gray-500)' }}>{f.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Visual placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            width: '100%', aspectRatio: '4/3',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, var(--color-gray-100) 0%, #EDE8E0 50%, var(--color-cream) 100%)',
            border: '1px solid rgba(0,0,0,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div style={{ textAlign: 'center', color: 'var(--color-gray-400)' }}>
            <Wand2 size={48} style={{ marginBottom: 16, opacity: 0.4 }} />
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: '0.75rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>3D Designer Preview</div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .designer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
