import { motion } from 'framer-motion';
import { testimonials } from '../../data/content';
import { Star, Quote } from 'lucide-react';

export function TestimonialsCarousel() {
  return (
    <section style={{ background: 'var(--color-warm-white)', padding: 'var(--space-24) 0' }}>
      <div className="container">
        {/* Header */}
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
          }}>Testimonials</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300, color: 'var(--color-dark)', marginBottom: 20,
          }}>
            Trusted by <span style={{ fontWeight: 600 }}>Modern Businesses</span>
          </h2>

          {/* Rating badge */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 12, marginTop: 8,
          }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="var(--color-accent)" color="var(--color-accent)" />
              ))}
            </div>
            <span style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 700, color: 'var(--color-dark)' }}>4.9 / 5</span>
            <span style={{ fontSize: 'var(--fs-small)', color: 'var(--color-gray-500)' }}>(17+ Google Reviews)</span>
          </div>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 24,
        }}>
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                padding: 36,
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(0,0,0,0.04)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex', flexDirection: 'column',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Quote icon */}
              <Quote size={28} style={{ color: 'var(--color-accent)', opacity: 0.3, marginBottom: 20 }} />

              {/* Stars */}
              <div style={{ display: 'flex', gap: 2, marginBottom: 20 }}>
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={14} fill="var(--color-accent)" color="var(--color-accent)" />
                ))}
              </div>

              <p style={{
                fontSize: 'var(--fs-body-lg)', color: 'var(--color-gray-700)',
                lineHeight: 'var(--lh-relaxed)', flex: 1, marginBottom: 28,
              }}>"{t.quote}"</p>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 16,
                paddingTop: 20, borderTop: '1px solid rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'var(--color-primary-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, color: 'var(--color-primary)',
                  fontSize: 'var(--fs-body)', fontFamily: 'var(--font-heading)',
                }}>{t.name.charAt(0)}</div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-dark)', fontSize: 'var(--fs-body)' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-gray-500)' }}>
                    {t.role} · {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
