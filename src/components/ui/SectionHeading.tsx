import { motion } from 'framer-motion';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export function SectionHeading({
  subtitle,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        textAlign: align,
        marginBottom: 'var(--space-12)',
        maxWidth: align === 'center' ? 640 : undefined,
        marginLeft: align === 'center' ? 'auto' : undefined,
        marginRight: align === 'center' ? 'auto' : undefined,
      }}
    >
      {subtitle && (
        <div style={{
          fontSize: 'var(--fs-small)',
          fontWeight: 'var(--fw-semibold)',
          color: light ? 'var(--color-accent-light)' : 'var(--color-primary)',
          letterSpacing: 'var(--ls-wider)',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-3)',
        }}>
          {subtitle}
        </div>
      )}
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 'var(--fw-semibold)',
        color: light ? '#fff' : 'var(--color-dark)',
        lineHeight: 'var(--lh-snug)',
        marginBottom: description ? 'var(--space-4)' : 0,
      }}>
        {title}
      </h2>
      {description && (
        <p style={{
          fontSize: 'var(--fs-body-lg)',
          color: light ? 'rgba(255,255,255,0.7)' : 'var(--color-gray-500)',
          lineHeight: 'var(--lh-relaxed)',
        }}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
