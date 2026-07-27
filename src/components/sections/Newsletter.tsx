import { motion } from 'framer-motion';
import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section style={{ background: 'var(--color-cream)', padding: 'var(--space-24) 0' }}>
      <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-accent)',
            marginBottom: 16,
          }}>Stay Updated</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 300, color: 'var(--color-dark)', marginBottom: 16,
          }}>
            Workspace insights, <span style={{ fontWeight: 600 }}>delivered.</span>
          </h2>
          <p style={{
            fontSize: 'var(--fs-body)', color: 'var(--color-gray-500)',
            lineHeight: 'var(--lh-relaxed)', marginBottom: 40,
          }}>
            Receive curated workspace trends, product launches, and exclusive offers. No spam, ever.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: '20px 32px', background: 'var(--color-white)',
                borderRadius: 'var(--radius-full)', color: 'var(--color-dark)',
                fontSize: 'var(--fs-body)', fontWeight: 500,
                border: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              Thank you! We will be in touch.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              display: 'flex', gap: 0,
              background: 'var(--color-white)',
              borderRadius: 'var(--radius-full)',
              padding: 6,
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
            }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  background: 'transparent', padding: '14px 24px',
                  fontSize: 'var(--fs-body)', color: 'var(--color-dark)',
                  fontFamily: 'var(--font-body)',
                }}
              />
              <button type="submit" style={{
                padding: '14px 32px', background: 'var(--color-dark)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem', fontWeight: 600,
                letterSpacing: '0.05em', cursor: 'pointer',
                transition: 'background 0.3s ease',
                border: 'none',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--color-dark)'}
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
