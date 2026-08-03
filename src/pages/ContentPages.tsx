import { SectionHeading } from '../components/ui/SectionHeading';
import type { ReactNode } from 'react';

function SimplePage({ title, description, children }: { title: string, description: string, children?: ReactNode }) {
  return (
    <div style={{ background: 'var(--color-warm-white)', minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
      <div style={{
        background: 'var(--color-cream)',
        paddingTop: 'calc(var(--nav-height) + var(--space-12))',
        paddingBottom: 'var(--space-12)',
        marginBottom: 'var(--space-12)',
        borderBottom: '1px solid var(--color-gray-200)'
      }}>
        <div className="container">
          <SectionHeading subtitle="Information" title={title} description={description} align="left" />
        </div>
      </div>
      <div className="container">
        <div style={{ padding: 'var(--space-12)', background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)', minHeight: 400 }}>
          {children ? children : <p style={{ color: 'var(--color-gray-500)' }}>Content coming soon...</p>}
        </div>
      </div>
    </div>
  );
}

export const AboutPage = () => (
  <SimplePage title="About Magnus Office Furniture" description="Learn about our journey crafting premium office solutions for modern businesses.">
    <div style={{ maxWidth: 800 }}>
      <h3 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-4)', color: 'var(--color-dark)' }}>Our Story</h3>
      <p style={{ color: 'var(--color-gray-600)', lineHeight: 'var(--lh-relaxed)', marginBottom: 'var(--space-6)' }}>
        Magnus Office Furniture is a trusted provider of premium office furniture solutions for modern businesses in Hyderabad and beyond. We understand that a well-designed workspace is critical to employee productivity, well-being, and corporate identity.
      </p>
      <p style={{ color: 'var(--color-gray-600)', lineHeight: 'var(--lh-relaxed)' }}>
        From ergonomic seating and executive cabins to large-scale modular workstations, our commitment is to provide uncompromising quality, honest craftsmanship, and exceptional service to corporate offices, IT companies, startups, and commercial institutions.
      </p>
    </div>
  </SimplePage>
);

export { ServicesPage } from './ServicesPage';
export { GalleryPage } from './GalleryPage';
export const TestimonialsPage = () => <SimplePage title="Client Testimonials" description="Hear from the companies and startups we've partnered with." />;
export const FaqPage = () => <SimplePage title="Frequently Asked Questions" description="Find answers to common questions about our corporate furniture, bulk orders, and services." />;
export const ContactPage = () => (
  <SimplePage title="Contact Us" description="Get in touch with our corporate sales and support team.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)' }}>
      <div>
        <h3 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-6)', color: 'var(--color-dark)' }}>Get in Touch</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div>
            <div style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', color: 'var(--color-gray-400)', letterSpacing: 'var(--ls-wider)', marginBottom: 4 }}>Visit Our Showroom</div>
            <div style={{ color: 'var(--color-dark)', lineHeight: 'var(--lh-relaxed)' }}>
              BP Raju Marg, M R Elite, 3rd Floor,<br />
              Above BKP Homes, Opposite Sarath City,<br />
              Ratnadeep Right Side Lane, Kondapur,<br />
              Hyderabad, Telangana – 500084
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', color: 'var(--color-gray-400)', letterSpacing: 'var(--ls-wider)', marginBottom: 4 }}>Call Us</div>
            <a href="tel:+919090626209" style={{ color: 'var(--color-primary)', fontWeight: 'var(--fw-medium)' }}>+91 90906 26209</a>
          </div>
          <div>
            <div style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', color: 'var(--color-gray-400)', letterSpacing: 'var(--ls-wider)', marginBottom: 4 }}>Email</div>
            <a href="mailto:hello@magnusofficefurniture.com" style={{ color: 'var(--color-primary)', fontWeight: 'var(--fw-medium)' }}>hello@magnusofficefurniture.com</a>
          </div>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <a href="https://wa.me/919090626209" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#25D366', color: '#fff', padding: '12px 24px', borderRadius: 'var(--radius-md)', fontWeight: 'var(--fw-semibold)', textDecoration: 'none' }}>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: '100%', height: '100%', minHeight: 300, background: 'var(--color-cream)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gray-400)', border: '1px solid var(--color-gray-200)' }}>
          Map Placeholder
        </div>
      </div>
    </div>
  </SimplePage>
);
