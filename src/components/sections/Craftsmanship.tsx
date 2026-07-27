import { motion } from 'framer-motion';
import { Ruler, Factory, Truck, ShieldCheck } from 'lucide-react';

const steps = [
  { icon: Ruler, title: 'Workspace Planning', desc: 'Precision layouts tailored to your floor plan, team size, and workflow requirements.' },
  { icon: Factory, title: 'Manufacturing', desc: 'Crafted in our Hyderabad workshop using commercial-grade materials and expert joinery.' },
  { icon: Truck, title: 'Installation', desc: 'Professional on-site assembly by our trained technicians with zero disruption.' },
  { icon: ShieldCheck, title: 'Quality Assurance', desc: 'Rigorous inspection at every stage, backed by comprehensive commercial warranties.' },
];

export function Craftsmanship() {
  return (
    <section style={{ background: 'var(--color-cream)', padding: 'var(--space-24) 0', overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div style={{
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-accent)',
            marginBottom: 16,
          }}>Our Process</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300, color: 'var(--color-dark)', marginBottom: 20,
          }}>
            From Vision to <span style={{ fontWeight: 600 }}>Reality</span>
          </h2>
          <p style={{
            fontSize: 'var(--fs-body-lg)', color: 'var(--color-gray-500)',
            maxWidth: 520, margin: '0 auto', lineHeight: 'var(--lh-relaxed)',
          }}>
            Every workspace we deliver follows a meticulous four-stage process, ensuring excellence at every step.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: 1, background: 'var(--color-gray-200)',
            transform: 'translateX(-50%)',
          }} className="timeline-line" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 60px 1fr',
                alignItems: 'center',
                marginBottom: i < steps.length - 1 ? 60 : 0,
              }}
              className="timeline-row"
            >
              {/* Left content (even) or empty */}
              <div style={{
                textAlign: i % 2 === 0 ? 'right' : 'left',
                padding: i % 2 === 0 ? '0 40px 0 0' : '0 0 0 40px',
                gridColumn: i % 2 === 0 ? '1' : '3',
                gridRow: 1,
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h3)',
                  fontWeight: 600, color: 'var(--color-dark)', marginBottom: 8,
                }}>{step.title}</h3>
                <p style={{
                  fontSize: 'var(--fs-body)', color: 'var(--color-gray-500)',
                  lineHeight: 'var(--lh-relaxed)', maxWidth: 360,
                  marginLeft: i % 2 === 0 ? 'auto' : 0,
                }}>{step.desc}</p>
              </div>

              {/* Center icon */}
              <div style={{
                gridColumn: 2, gridRow: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'var(--color-white)', border: '2px solid var(--color-accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-accent)', boxShadow: '0 4px 20px rgba(212, 175, 55, 0.12)',
                  position: 'relative', zIndex: 2,
                }}>
                  <step.icon size={22} />
                </div>
              </div>

              {/* Spacer for the other side */}
              <div style={{ gridColumn: i % 2 === 0 ? '3' : '1', gridRow: 1 }} />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-line { left: 26px !important; }
          .timeline-row {
            grid-template-columns: 52px 1fr !important;
            gap: 0 20px !important;
          }
          .timeline-row > div:first-child {
            grid-column: 2 !important;
            text-align: left !important;
            padding: 0 !important;
          }
          .timeline-row > div:nth-child(2) {
            grid-column: 1 !important;
            grid-row: 1 !important;
          }
          .timeline-row > div:nth-child(3) { display: none !important; }
        }
      `}</style>
    </section>
  );
}
