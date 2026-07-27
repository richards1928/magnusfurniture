import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { services } from '../../data/content';

export function ServicesPreview() {
  return (
    <section className="section" style={{ background: 'var(--color-cream)' }}>
      <div className="container">
        <SectionHeading
          subtitle="Our Services"
          title="End-to-End Furniture Solutions"
          description="From design to delivery, we handle every step with care and precision."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-6)',
        }}>
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: 'var(--space-8)',
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-gray-200)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>
                {service.icon}
              </div>
              <h3 style={{
                fontSize: 'var(--fs-body-lg)',
                fontWeight: 'var(--fw-semibold)',
                color: 'var(--color-dark)',
                marginBottom: 'var(--space-3)',
              }}>{service.title}</h3>
              <p style={{
                fontSize: 'var(--fs-small)',
                color: 'var(--color-gray-500)',
                lineHeight: 'var(--lh-relaxed)',
              }}>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
