import { motion } from 'framer-motion';
import { ArrowRight, Wand2, Sparkles, Layers, Sliders, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import customDeskImage from '../../assets/products/mdTables/vb-alaska.webp';

export function DesignYourOwn() {
  return (
    <section style={{
      background: 'radial-gradient(circle at 50% 0%, #2A1D1A 0%, #150E0C 60%, #0A0706 100%)',
      padding: 'var(--space-24) 0',
      position: 'relative',
      overflow: 'hidden',
      color: '#FFFFFF'
    }}>
      {/* Background Subtle Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(212, 175, 55, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212, 175, 55, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 75%)',
        pointerEvents: 'none'
      }} />

      {/* Ambient Lighting Glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: 500,
        height: 350,
        background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      <div className="container designer-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr',
        gap: 'var(--space-16)',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 18px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(212, 175, 55, 0.12)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: 'var(--color-accent)',
            fontSize: 'var(--fs-xs)',
            fontWeight: 'var(--fw-semibold)',
            letterSpacing: 'var(--ls-wider)',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-6)'
          }}>
            <Wand2 size={14} /> 3D Workspace Configurator
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
            fontWeight: 'var(--fw-light)',
            color: '#FFFFFF',
            lineHeight: 'var(--lh-tight)',
            marginBottom: 'var(--space-6)'
          }}>
            Design Your Ideal<br />
            <span style={{ fontWeight: 'var(--fw-bold)', color: 'var(--color-accent)' }}>
              Workspace in 3D
            </span>
          </h2>

          <p style={{
            fontSize: 'var(--fs-body-lg)',
            color: 'rgba(255, 255, 255, 0.75)',
            lineHeight: 'var(--lh-relaxed)',
            maxWidth: 520,
            marginBottom: 'var(--space-8)'
          }}>
            Use our interactive configurator to tailor executive desks, workstations, and conference tables. Choose exact dimensions, wood veneers, power modules, and wire channels — see it all come to life in real time.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}>
            <Link to="/custom-furniture" style={{ textDecoration: 'none' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '16px 36px',
                  background: 'linear-gradient(135deg, var(--color-accent) 0%, #b8932b 100%)',
                  color: 'var(--color-dark)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.95rem',
                  fontWeight: 'var(--fw-bold)',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(212, 175, 55, 0.25)',
                  transition: 'all 0.3s ease'
                }}
              >
                Launch Custom Configurator <ArrowRight size={18} />
              </span>
            </Link>
          </div>

          {/* Quick Feature Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
            {[
              { title: 'Millimeter Fit', label: 'Custom Sizing', icon: Sliders },
              { title: '50+ Swatches', label: 'Veneers & Laminates', icon: Layers },
              { title: 'Instant CAD', label: '2D/3D Exports', icon: Sparkles }
            ].map((f) => {
              const FIcon = f.icon;
              return (
                <div key={f.title} style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3) var(--space-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-xs)', color: 'var(--color-accent)', fontWeight: 'bold', marginBottom: 2 }}>
                    <FIcon size={13} /> {f.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>{f.label}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Visual Image Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ position: 'relative' }}
        >
          <div style={{
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            position: 'relative',
            aspectRatio: '16/11',
            background: '#0D0A09'
          }}>
            <img
              src={customDeskImage}
              alt="3D Custom Executive Furniture Configurator"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 50%, rgba(10,7,6,0.85) 100%)'
            }} />

            {/* Spatial Floating Badge */}
            <div style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 20px',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: 'var(--color-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-primary)' }}>
                  3D CONFIGURATOR MODEL
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-body-lg)', fontWeight: 'bold' }}>
                  Alaska Executive Desk
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-xs)', color: 'var(--color-success)', fontWeight: 'bold' }}>
                <CheckCircle2 size={16} /> CAD Ready
              </div>
            </div>
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
