import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CompanyIntro() {
  return (
    <section className="section" style={{ background: 'var(--color-white)' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-16)',
        alignItems: 'center',
      }}>
        {/* Visual / Image Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-4)',
          position: 'relative',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              width: '100%',
              aspectRatio: '3/4',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-cream) 100%)',
              marginTop: 'var(--space-8)',
              border: '1px solid var(--color-gray-200)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              width: '100%',
              aspectRatio: '3/4',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--color-cream) 0%, var(--color-gray-200) 100%)',
              marginBottom: 'var(--space-8)',
              border: '1px solid var(--color-gray-200)',
            }}
          />
          {/* Badge */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'var(--color-white)',
            padding: 'var(--space-4)',
            borderRadius: '50%',
            boxShadow: 'var(--shadow-xl)',
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            width: 140, height: 140,
          }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 'var(--fw-bold)', color: 'var(--color-primary)', lineHeight: 1 }}>15+</div>
            <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-dark)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wider)', marginTop: 4 }}>Years of<br />Excellence</div>
          </div>
        </div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            subtitle="About Us"
            title="Crafting Spaces That Inspire"
            align="left"
          />
          <div style={{
            fontSize: 'var(--fs-body-lg)',
            color: 'var(--color-gray-500)',
            lineHeight: 'var(--lh-relaxed)',
            display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
          }}>
            <p>
              At Magnus Furniture, we believe that your home should be a reflection of who you are. For over 15 years, we have been crafting premium furniture that blends timeless aesthetics with modern functionality.
            </p>
            <p>
              From our humble beginnings in a small workshop to becoming a trusted international brand, our commitment has never changed: to provide uncompromising quality, honest craftsmanship, and exceptional service.
            </p>
          </div>
          <Link to="/about">
            <Button variant="outline" size="md">
              Discover Our Story <ArrowRight size={16} />
            </Button>
          </Link>
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
