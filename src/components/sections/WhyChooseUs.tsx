import { motion } from 'framer-motion';
import { ShieldCheck, Sofa, Settings, Package, Award, Truck } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: 'Premium Materials', desc: 'Commercial-grade, built to endure.' },
  { icon: Sofa, title: 'Ergonomic Design', desc: 'Health-first engineering for your team.' },
  { icon: Settings, title: 'Full Customization', desc: 'Tailored to your brand and floor plan.' },
  { icon: Package, title: 'Bulk Orders', desc: 'Volume pricing, dedicated management.' },
  { icon: Award, title: 'Warranty Backed', desc: 'Comprehensive commercial coverage.' },
  { icon: Truck, title: 'On-Time Delivery', desc: 'Professional, safe, and punctual.' },
];

export function WhyChooseUs() {
  return (
    <section style={{ background: 'var(--color-warm-white)', padding: 'var(--space-24) 0' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 2fr',
          gap: 'var(--space-16)', alignItems: 'start',
        }} className="why-grid">
          {/* Left heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ position: 'sticky', top: 120 }}
          >
            <div style={{
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--color-accent)',
              marginBottom: 16,
            }}>Why Magnus</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300, color: 'var(--color-dark)', marginBottom: 20,
            }}>
              The Magnus<br /><span style={{ fontWeight: 600 }}>Advantage</span>
            </h2>
            <p style={{
              fontSize: 'var(--fs-body)', color: 'var(--color-gray-500)',
              lineHeight: 'var(--lh-relaxed)', maxWidth: 320,
            }}>
              Every detail is considered. Every material is tested. Every workspace is crafted to perform.
            </p>
          </motion.div>

          {/* Right features grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 24,
          }} className="why-features-grid">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  padding: 32,
                  background: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{ y: -4, boxShadow: 'var(--shadow-md)' }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 'var(--radius-md)',
                  background: 'var(--color-primary-bg)',
                  color: 'var(--color-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <feature.icon size={20} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-body-lg)',
                  fontWeight: 600, color: 'var(--color-dark)', marginBottom: 8,
                }}>{feature.title}</h3>
                <p style={{
                  fontSize: 'var(--fs-small)', color: 'var(--color-gray-500)',
                  lineHeight: 'var(--lh-relaxed)',
                }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .why-features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
