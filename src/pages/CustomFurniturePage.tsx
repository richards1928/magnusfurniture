import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Monitor, CheckCircle, PenTool } from 'lucide-react';

export function CustomFurniturePage() {
  return (
    <div style={{ background: 'var(--color-warm-white)', minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--color-cream)',
        paddingTop: 'calc(var(--nav-height) + var(--space-12))',
        paddingBottom: 'var(--space-12)',
        marginBottom: 'var(--space-12)',
        borderBottom: '1px solid var(--color-gray-200)'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <SectionHeading
            subtitle="Customization"
            title="Workspace Design Solutions"
            description="Bring your corporate vision to life. Use our advanced 3D designer or work with our layout experts to create workstations tailored exactly to your floor plan."
          />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Link to="/designer">
              <Button variant="primary" size="lg">
                Launch Workspace Designer <ArrowRight size={18} />
              </Button>
            </Link>
            <Button variant="outline" size="lg" href="tel:+919090626209">
              Talk to an Expert
            </Button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Process Section */}
        <div style={{ marginBottom: 'var(--space-24)' }}>
          <h3 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-heading)', color: 'var(--color-dark)', textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            How It Works
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-8)',
          }}>
            {[
              { icon: PenTool, title: '1. Requirement Analysis', desc: 'Define your corporate requirements, team sizes, and space dimensions.' },
              { icon: Monitor, title: '2. Custom Design', desc: 'Use our web designer to build it, or let our architects draft the CAD models.' },
              { icon: CheckCircle, title: '3. Finalize & Quote', desc: 'Review the layout, confirm materials, and get an instant transparent quote.' },
              { icon: Box, title: '4. Manufacturing & Installation', desc: 'We craft your pieces in our workshop and deliver them fully assembled on-site.' },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  width: 80, height: 80, borderRadius: 'var(--radius-full)',
                  background: 'var(--color-cream)',
                  border: '1px solid var(--color-gray-200)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-primary)', margin: '0 auto var(--space-4)'
                }}>
                  <step.icon size={32} />
                </div>
                <h4 style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-dark)', marginBottom: 'var(--space-2)' }}>{step.title}</h4>
                <p style={{ fontSize: 'var(--fs-small)', color: 'var(--color-gray-500)', lineHeight: 'var(--lh-relaxed)' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery Teaser */}
        <div style={{
          background: 'var(--color-dark)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-12)',
          color: '#fff',
          textAlign: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h2)', marginBottom: 'var(--space-4)' }}>See What Others Built</h2>
          <p style={{ fontSize: 'var(--fs-body)', color: 'var(--color-gray-400)', maxWidth: 600, margin: '0 auto var(--space-8)' }}>
            From perfect-fit workstations to bespoke boardroom tables, browse our gallery of customer-designed office layouts.
          </p>
          <Link to="/gallery">
            <Button variant="outline" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              View Gallery
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
