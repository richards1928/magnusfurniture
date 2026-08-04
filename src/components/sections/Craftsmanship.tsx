import { motion } from 'framer-motion';
import { Ruler, Factory, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const steps = [
  {
    num: '01',
    icon: Ruler,
    title: 'Workspace Planning',
    desc: 'We conduct an in-depth study of your floor plan, team headcount, and workflow patterns. Our designers produce scaled 2D and 3D layout proposals before any production begins.',
  },
  {
    num: '02',
    icon: Factory,
    title: 'Manufacturing',
    desc: 'Our Hyderabad workshop uses premium materials — high-density particleboard cores, solid wood veneer surfaces, and powder-coated steel frames — with expert joinery techniques.',
  },
  {
    num: '03',
    icon: Truck,
    title: 'Delivery & Installation',
    desc: 'Our trained logistics team delivers and assembles every piece on-site with surgical precision. We handle packaging disposal and do a complete post-installation walkthrough with you.',
  },
  {
    num: '04',
    icon: ShieldCheck,
    title: 'Quality Assurance',
    desc: 'Every unit passes a 15-point quality checklist before dispatch and again after installation. Our warranty team is available for up to 5 years post-delivery.',
  },
];

export function Craftsmanship() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{
      background: '#111009',
      padding: '120px 0 140px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Dot grid pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(212,175,55,0.07) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)',
        pointerEvents: 'none',
      }} />

      {/* Center gold glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translateX(-50%)',
        width: 700, height: 300,
        background: 'radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)', position: 'relative', zIndex: 1 }}>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(212,175,55,0.85)',
            marginBottom: 20,
          }}>
            <span style={{ width: 24, height: 1, background: 'rgba(212,175,55,0.4)', display: 'inline-block' }} />
            Our Process
            <span style={{ width: 24, height: 1, background: 'rgba(212,175,55,0.4)', display: 'inline-block' }} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 300, color: '#FFFFFF',
            lineHeight: 1.1, letterSpacing: '-0.02em',
            marginBottom: 20,
          }}>
            From Vision to <span style={{ fontWeight: 700 }}>Reality</span>
          </h2>

          <p style={{
            fontSize: '1rem', color: 'rgba(255,255,255,0.4)',
            maxWidth: 500, margin: '0 auto', lineHeight: 1.8,
          }}>
            Every workspace we deliver follows a meticulous four-stage process, ensuring excellence at every step.
          </p>
        </motion.div>

        {/* ── Steps Grid ──────────────────────────────────────────────── */}
        <div style={{ position: 'relative' }}>

          {/* Connecting line (desktop) */}
          <div style={{
            position: 'absolute',
            top: 48,
            left: '12.5%', right: '12.5%',
            height: 1,
            background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.25) 20%, rgba(212,175,55,0.25) 80%, transparent)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
            position: 'relative', zIndex: 1,
          }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isH = hovered === i;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    padding: '32px 24px 28px',
                    background: '#1A1712',
                    borderRadius: 20,
                    border: isH ? '1px solid rgba(212,175,55,0.35)' : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: isH ? '0 20px 56px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.25)',
                    transform: isH ? 'translateY(-6px)' : 'translateY(0)',
                    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    cursor: 'default',
                    display: 'flex', flexDirection: 'column',
                  }}
                >
                  {/* Step number */}
                  <div style={{
                    fontSize: '3rem', fontWeight: 800,
                    color: isH ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.06)',
                    fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
                    lineHeight: 1, marginBottom: 20,
                    letterSpacing: '-0.04em',
                    transition: 'color 0.3s ease',
                  }}>
                    {step.num}
                  </div>

                  {/* Icon pill */}
                  <div style={{
                    width: 46, height: 46, borderRadius: 14,
                    background: isH ? 'rgba(212,175,55,0.16)' : 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#D4AF37', marginBottom: 20,
                    transition: 'background 0.3s ease',
                  }}>
                    <Icon size={20} />
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
                    fontSize: '1rem', fontWeight: 700,
                    color: isH ? '#EDD98A' : '#FFFFFF',
                    marginBottom: 12,
                    transition: 'color 0.25s ease',
                  }}>
                    {step.title}
                  </h3>

                  <p style={{
                    fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)',
                    lineHeight: 1.8, flex: 1,
                  }}>
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 72 }}
        >
          <p style={{
            fontSize: '0.95rem', color: 'rgba(255,255,255,0.35)',
            marginBottom: 28, maxWidth: 400, margin: '0 auto 28px',
          }}>
            Ready to transform your workspace? Let's start with a free consultation.
          </p>
          <Link to="/custom-furniture" style={{ textDecoration: 'none' }}>
            <motion.span
              whileHover={{ scale: 1.04, y: -2 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '15px 36px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #EDD98A 50%, #D4AF37 100%)',
                backgroundSize: '200% 100%',
                borderRadius: 100,
                fontSize: '0.85rem', fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#0C0A09', cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(212,175,55,0.3)',
              }}
            >
              Start Your Project <ArrowRight size={15} />
            </motion.span>
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .craft-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .craft-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
