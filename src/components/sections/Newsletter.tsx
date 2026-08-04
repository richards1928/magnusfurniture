import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle2, Mail, ArrowRight } from 'lucide-react';

const microtrust = [
  '✓ No Spam Ever',
  '✓ Unsubscribe Anytime',
  '✓ Premium Content Only',
];

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section style={{
      background: '#0F0D0B',
      padding: '120px 0 140px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(212,175,55,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse at 50% 50%, black 0%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 0%, transparent 75%)',
        pointerEvents: 'none',
      }} />

      {/* Gold center glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 400,
        background: 'radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 660, margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 40px)',
        position: 'relative', zIndex: 1,
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 18px',
            background: 'rgba(212,175,55,0.1)',
            border: '1px solid rgba(212,175,55,0.25)',
            borderRadius: 100,
            fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(212,175,55,0.9)',
            marginBottom: 28,
          }}>
            <Mail size={11} />
            Stay Updated
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 300, color: '#FFFFFF',
            lineHeight: 1.15, letterSpacing: '-0.02em',
            marginBottom: 18,
          }}>
            Workspace insights,{' '}
            <span style={{ fontWeight: 700 }}>delivered.</span>
          </h2>

          <p style={{
            fontSize: '0.95rem', color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.8, marginBottom: 44, maxWidth: 480, margin: '0 auto 44px',
          }}>
            Receive curated workspace trends, product launches, and exclusive offers from Magnus. No spam, ever.
          </p>

          {/* Form / Success */}
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 16,
                  padding: '36px 40px',
                  background: 'rgba(212,175,55,0.07)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: 20,
                  marginBottom: 36,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
                >
                  <CheckCircle2 size={48} color="#D4AF37" />
                </motion.div>
                <div>
                  <div style={{
                    fontSize: '1.1rem', fontWeight: 700,
                    color: '#FFFFFF', marginBottom: 6,
                    fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
                  }}>
                    You're on the list!
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>
                    We'll be in touch with the latest from Magnus.
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'flex',
                  gap: 0,
                  background: '#1A1712',
                  borderRadius: 100,
                  padding: 6,
                  border: focused
                    ? '1px solid rgba(212,175,55,0.5)'
                    : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: focused ? '0 0 0 4px rgba(212,175,55,0.08)' : 'none',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  marginBottom: 36,
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Enter your work email"
                  required
                  style={{
                    flex: 1, border: 'none', outline: 'none',
                    background: 'transparent',
                    padding: '14px 24px',
                    fontSize: '0.9rem', color: '#FFFFFF',
                    fontFamily: 'var(--font-body, "Inter", sans-serif)',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 28px',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #EDD98A 50%, #D4AF37 100%)',
                    backgroundSize: '200% 100%',
                    color: '#0C0A09',
                    borderRadius: 100,
                    fontSize: '0.82rem', fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    cursor: 'pointer', border: 'none',
                    flexShrink: 0,
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(0.98)'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  Subscribe <ArrowRight size={13} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Micro-trust row */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: 28, flexWrap: 'wrap',
          }}>
            {microtrust.map((item, i) => (
              <span key={i} style={{
                fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)',
                fontWeight: 600, letterSpacing: '0.04em',
              }}>
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
