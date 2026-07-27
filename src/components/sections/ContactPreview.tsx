import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

export function ContactPreview() {
  return (
    <section className="section" style={{ background: 'var(--color-warm-white)' }}>
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
            background: 'linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-cream) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--color-gray-200)',
          }}
        >
          <div style={{ textAlign: 'center', color: 'var(--color-gray-400)' }}>
            <MapPin size={48} />
            <div style={{ marginTop: 12, fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-small)', letterSpacing: 'var(--ls-wider)', textTransform: 'uppercase' }}>
              Visit Our Showroom
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
