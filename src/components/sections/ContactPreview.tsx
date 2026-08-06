import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { MagnusMonogram, MagnusWatermark } from '../ui/MagnusLogo';

export function ContactPreview() {
  return (
    <section className="section" style={{ background: 'var(--color-warm-white)', position: 'relative', overflow: 'hidden' }}>
      {/* Section watermark */}
      <MagnusWatermark
        size={360}
        color="dark"
        opacity={0.03}
        style={{ left: -60, top: '50%', transform: 'translateY(-50%)' }}
      />
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-16)',
        alignItems: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            fontSize: 'var(--fs-small)',
            fontWeight: 'var(--fw-semibold)',
            color: 'var(--color-primary)',
            letterSpacing: 'var(--ls-wider)',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-3)',
          }}>Get In Touch</div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--fw-semibold)',
            color: 'var(--color-dark)',
            marginBottom: 'var(--space-6)',
          }}>Ready to Transform Your Space?</h2>

          <p style={{
            fontSize: 'var(--fs-body-lg)',
            color: 'var(--color-gray-500)',
            lineHeight: 'var(--lh-relaxed)',
            marginBottom: 'var(--space-8)',
          }}>
            Whether you are furnishing a new corporate office, redesigning a startup workspace, or need bulk workstations — we are here to help. Reach out and let us bring your vision to life.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-8)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-primary-bg)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={24} />
              </div>
              <h4 style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-dark)' }}>Call Us</h4>
              <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--fs-small)', textAlign: 'center' }}>+91 90906 26209</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-primary-bg)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={24} />
              </div>
              <h4 style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-dark)' }}>Email Us</h4>
              <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--fs-small)', textAlign: 'center' }}>hello@magnusofficefurniture.com</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-primary-bg)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={24} />
              </div>
              <h4 style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-dark)' }}>Visit Us</h4>
              <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--fs-small)', textAlign: 'center', lineHeight: 'var(--lh-relaxed)' }}>
                M R Elite, 3rd Floor, Kondapur<br />
                Hyderabad, Telangana 500084
              </p>
            </div>
          </div>
        </motion.div>

        {/* Map / visual placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--color-gray-200)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background brand watermark */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.08 }}>
            <MagnusMonogram size={220} color="gold" />
          </div>
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.85)', position: 'relative', zIndex: 1 }}>
            <MagnusMonogram size={64} color="gold" style={{ margin: '0 auto 16px' }} />
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-small)', letterSpacing: 'var(--ls-wider)', textTransform: 'uppercase', color: 'rgba(212,175,55,0.9)' }}>
              Visit Our Showroom
            </div>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'rgba(255,255,255,0.55)', marginTop: 8, lineHeight: 'var(--lh-relaxed)' }}>
              M R Elite, 3rd Floor<br />Kondapur, Hyderabad
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
