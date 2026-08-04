import { motion } from 'framer-motion';
import { testimonials } from '../../data/content';
import { Star, Quote, BadgeCheck } from 'lucide-react';
import { useState } from 'react';

const trustBadges = [
  { icon: '⭐', label: 'Google 4.9 / 5' },
  { icon: '✓', label: '17+ Verified Reviews' },
  { icon: '🏆', label: 'Hyderabad Business Leader' },
  { icon: '🛡️', label: 'Premium Quality Certified' },
];

export function TestimonialsCarousel() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section style={{
      background: '#0A0806',
      padding: '120px 0 140px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glows */}
      <div style={{
        position: 'absolute', top: '5%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)', position: 'relative', zIndex: 1 }}>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(212,175,55,0.85)',
            marginBottom: 20,
          }}>
            <span style={{ width: 24, height: 1, background: 'rgba(212,175,55,0.4)', display: 'inline-block' }} />
            Testimonials
            <span style={{ width: 24, height: 1, background: 'rgba(212,175,55,0.4)', display: 'inline-block' }} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 300, color: '#FFFFFF',
            lineHeight: 1.1, letterSpacing: '-0.02em',
            marginBottom: 28,
          }}>
            Trusted by <span style={{ fontWeight: 700 }}>Modern Businesses</span>
          </h2>

          {/* Rating badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            padding: '12px 28px',
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.25)',
            borderRadius: 100,
          }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#D4AF37" color="#D4AF37" />
              ))}
            </div>
            <span style={{
              fontSize: '1rem', fontWeight: 800,
              color: '#D4AF37', fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
            }}>4.9 / 5</span>
            <span style={{ width: 1, height: 16, background: 'rgba(212,175,55,0.3)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
              17+ Google Reviews
            </span>
          </div>
        </motion.div>

        {/* ── Cards ───────────────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: 24,
          marginBottom: 72,
        }}>
          {testimonials.slice(0, 3).map((t, i) => {
            const isH = hovered === t.id;
            const initials = t.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHovered(t.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: '36px 32px',
                  background: '#161310',
                  borderRadius: 20,
                  border: isH ? '1px solid rgba(212,175,55,0.35)' : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: isH ? '0 20px 56px rgba(0,0,0,0.55)' : '0 4px 20px rgba(0,0,0,0.3)',
                  transform: isH ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {/* Quote icon */}
                <Quote
                  size={32}
                  style={{
                    color: '#D4AF37',
                    opacity: isH ? 0.35 : 0.18,
                    marginBottom: 20,
                    transition: 'opacity 0.3s ease',
                  }}
                />

                {/* Stars */}
                <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={14} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>

                {/* Quote text */}
                <p style={{
                  fontSize: '0.97rem',
                  color: 'rgba(255,255,255,0.72)',
                  lineHeight: 1.85,
                  fontStyle: 'italic',
                  flex: 1,
                  marginBottom: 28,
                }}>
                  "{t.quote}"
                </p>

                {/* Divider */}
                <div style={{
                  height: 1,
                  background: isH ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.06)',
                  marginBottom: 22,
                  transition: 'background 0.3s ease',
                }} />

                {/* Author row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #8B6914 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, color: '#0C0A09', fontSize: '0.95rem',
                    fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
                    flexShrink: 0,
                  }}>
                    {initials || 'G'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.9rem', marginBottom: 3 }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
                      {t.role} · {t.location}
                    </div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <BadgeCheck size={18} color="rgba(212,175,55,0.6)" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Trust Badges Row ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex', justifyContent: 'center',
            gap: 16, flexWrap: 'wrap',
          }}
        >
          {trustBadges.map((badge, i) => (
            <div key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 22px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 100,
              backdropFilter: 'blur(8px)',
              fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)',
              fontWeight: 600, letterSpacing: '0.04em',
            }}>
              <span>{badge.icon}</span>
              {badge.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
