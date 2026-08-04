import { motion } from 'framer-motion';
import { ShieldCheck, Sofa, Settings, Package, Award, Truck } from 'lucide-react';
import { useState } from 'react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Premium Materials',
    desc: 'Every piece is built with commercial-grade engineered wood, high-tensile steel frames, and premium upholstery. Our materials are rigorously tested to withstand years of heavy daily use without compromising on aesthetics.',
  },
  {
    icon: Sofa,
    title: 'Ergonomic Design',
    desc: 'Our furniture is engineered with human biomechanics in mind. From lumbar support curves to desk-height ratios, every dimension is optimised to reduce fatigue and promote healthy posture throughout long working hours.',
  },
  {
    icon: Settings,
    title: 'Full Customization',
    desc: 'Choose your exact dimensions, wood veneer, laminate finish, colour palette, and hardware fittings. We tailor every piece to match your brand identity and floor plan precisely.',
  },
  {
    icon: Package,
    title: 'Bulk Orders',
    desc: 'From 10-seat startups to 500-seat corporate campuses — we handle it all. Dedicated project managers, volume pricing, and milestone-based delivery ensure seamless large-scale execution.',
  },
  {
    icon: Award,
    title: 'Warranty Backed',
    desc: 'All Magnus products carry comprehensive commercial warranties ranging from 3 to 5 years. Our after-sales team responds within 24 hours for any maintenance or repair requests.',
  },
  {
    icon: Truck,
    title: 'On-Time Delivery',
    desc: 'We commit to delivery timelines and honour them. Our in-house logistics and professional installation teams ensure your office is up and running without delays or disruptions.',
  },
];

const stats = [
  { value: '500+', label: 'Projects' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '5 Yr', label: 'Warranty' },
];

export function WhyChooseUs() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{
      background: '#0A0806',
      padding: '120px 0 140px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glows */}
      <div style={{
        position: 'absolute', top: '10%', left: '-8%',
        width: 560, height: 560, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(260px, 28%, 360px) 1fr',
          gap: 80,
          alignItems: 'start',
        }}>

          {/* ── Left Sticky Heading ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'sticky', top: 120 }}
          >
            {/* Gold left bar */}
            <div style={{
              width: 3, height: 48,
              background: 'linear-gradient(to bottom, #D4AF37, rgba(212,175,55,0.2))',
              borderRadius: 2, marginBottom: 28,
            }} />

            <div style={{
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(212,175,55,0.85)', marginBottom: 18,
            }}>
              Why Magnus
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 300, color: '#FFFFFF',
              lineHeight: 1.1, letterSpacing: '-0.02em',
              marginBottom: 20,
            }}>
              The Magnus<br />
              <span style={{ fontWeight: 700 }}>Advantage</span>
            </h2>

            <p style={{
              fontSize: '0.95rem', color: 'rgba(255,255,255,0.42)',
              lineHeight: 1.8, marginBottom: 40, maxWidth: 300,
            }}>
              Every detail is considered. Every material is tested. Every workspace is crafted to perform and inspire.
            </p>

            {/* Stat pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {stats.map(s => (
                <div key={s.label} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 14,
                  padding: '12px 20px',
                  background: 'rgba(212,175,55,0.07)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: 12,
                }}>
                  <span style={{
                    fontSize: '1.3rem', fontWeight: 800,
                    color: '#D4AF37', letterSpacing: '-0.02em',
                    fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
                  }}>{s.value}</span>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right Features Grid ─────────────────────────────────────── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20,
          }}>
            {features.map((feature, i) => {
              const Icon = feature.icon;
              const isH = hovered === i;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    padding: '28px 26px',
                    background: '#141210',
                    borderRadius: 18,
                    border: isH ? '1px solid rgba(212,175,55,0.35)' : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: isH ? '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.1)' : '0 4px 20px rgba(0,0,0,0.25)',
                    transform: isH ? 'translateY(-5px)' : 'translateY(0)',
                    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    cursor: 'default',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: isH ? 'rgba(212,175,55,0.18)' : 'rgba(212,175,55,0.09)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20,
                    transition: 'background 0.3s ease',
                    color: '#D4AF37',
                  }}>
                    <Icon size={20} />
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
                    fontSize: '1rem', fontWeight: 700,
                    color: isH ? '#EDD98A' : '#FFFFFF',
                    marginBottom: 10,
                    transition: 'color 0.25s ease',
                  }}>
                    {feature.title}
                  </h3>

                  <p style={{
                    fontSize: '0.82rem', color: 'rgba(255,255,255,0.42)',
                    lineHeight: 1.75,
                  }}>
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .wcu-grid { grid-template-columns: 1fr !important; }
          .wcu-features { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
