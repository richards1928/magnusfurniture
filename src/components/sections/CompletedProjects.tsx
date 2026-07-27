import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  { title: 'TechStar Solutions', location: 'Gachibowli, Hyderabad', industry: 'IT / SaaS', size: '120 Seats', timeline: '6 Weeks', products: 'Workstations, Chairs, Conference' },
  { title: 'Greenfield Capital', location: 'Banjara Hills, Hyderabad', industry: 'Finance', size: '45 Seats', timeline: '3 Weeks', products: 'Executive Desks, Cabins, Storage' },
  { title: 'Nova Design Studio', location: 'Kondapur, Hyderabad', industry: 'Creative Agency', size: '30 Seats', timeline: '2 Weeks', products: 'Open Plan, Collaborative Tables' },
];

export function CompletedProjects() {
  return (
    <section style={{ background: 'var(--color-dark)', padding: 'var(--space-24) 0' }}>
      <div className="container">
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
          }}>Portfolio</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300, color: '#fff', marginBottom: 20,
          }}>
            Completed <span style={{ fontWeight: 600 }}>Projects</span>
          </h2>
          <p style={{
            fontSize: 'var(--fs-body-lg)', color: 'rgba(255,255,255,0.5)',
            maxWidth: 520, margin: '0 auto', lineHeight: 'var(--lh-relaxed)',
          }}>
            A selection of workspaces we have recently designed, built, and delivered.
          </p>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 24,
        }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease',
              }}
              whileHover={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}
            >
              {/* Project image placeholder */}
              <div style={{
                width: '100%', aspectRatio: '16/9',
                background: `linear-gradient(135deg, rgba(62, 39, 35, 0.5) 0%, rgba(30, 20, 18, 0.8) 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.2)', fontWeight: 600,
                }}>Project Photo</span>
              </div>

              <div style={{ padding: '28px 28px 32px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h4)',
                  fontWeight: 600, color: '#fff', marginBottom: 8,
                }}>{project.title}</h3>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 'var(--fs-small)', color: 'rgba(255,255,255,0.4)',
                  marginBottom: 20,
                }}>
                  <MapPin size={13} /> {project.location}
                </div>

                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr',
                  gap: '12px 20px', marginBottom: 24,
                }}>
                  {[
                    { label: 'Industry', value: project.industry },
                    { label: 'Office Size', value: project.size },
                    { label: 'Timeline', value: project.timeline },
                    { label: 'Products', value: project.products },
                  ].map(detail => (
                    <div key={detail.label}>
                      <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>{detail.label}</div>
                      <div style={{ fontSize: 'var(--fs-small)', color: 'rgba(255,255,255,0.7)' }}>{detail.value}</div>
                    </div>
                  ))}
                </div>

                <Link to="/gallery" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'var(--color-accent)',
                  textDecoration: 'none', transition: 'gap 0.3s ease',
                }}>
                  View Project <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
