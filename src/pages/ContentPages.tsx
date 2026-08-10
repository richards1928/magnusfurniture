import { SectionHeading } from '../components/ui/SectionHeading';
import type { ReactNode } from 'react';
import { Button } from '../components/ui/Button';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star, 
  Globe, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare,
  Award
} from 'lucide-react';
import { MagnusMonogram } from '../components/ui/MagnusLogo';
import { InstagramIcon, YoutubeIcon, LinkedinIcon, FacebookIcon } from '../components/ui/SocialIcons';

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
    {/* TOP SECTION: CONTACT DETAILS AND MAP */}
    <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)', marginBottom: 'var(--space-12)', alignItems: 'stretch' }}>
      <div>
        <h3 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-4)', color: 'var(--color-dark)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <MagnusMonogram size={32} color="gold" style={{ opacity: 0.85, flexShrink: 0 }} />
          Get in Touch
        </h3>
        
        {/* Google Rating Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-bg)', color: 'var(--color-primary)', border: '1px solid rgba(62, 39, 35, 0.1)', marginBottom: 'var(--space-6)' }}>
          <Star size={16} fill="var(--color-accent)" stroke="var(--color-accent)" />
          <span style={{ fontWeight: 'var(--fw-bold)' }}>4.9 / 5</span>
          <span style={{ color: 'var(--color-gray-500)', fontSize: 'var(--fs-small)' }}>Based on 17 Google Reviews</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div>
            <div style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', color: 'var(--color-gray-400)', letterSpacing: 'var(--ls-wider)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={14} color="var(--color-primary)" /> Visit Our Showroom
            </div>
            <div style={{ color: 'var(--color-dark)', lineHeight: 'var(--lh-relaxed)' }}>
              BP Raju Marg, M R Elite, 3rd Floor,<br />
              Above BKP Homes, Opposite Sarath City,<br />
              Ratnadeep Right Side Lane, Kondapur,<br />
              Hyderabad, Telangana – 500084
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', color: 'var(--color-gray-400)', letterSpacing: 'var(--ls-wider)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Phone size={14} color="var(--color-primary)" /> Call Us
            </div>
            <a href="tel:+919090626209" style={{ color: 'var(--color-primary)', fontWeight: 'var(--fw-medium)', textDecoration: 'none' }}>+91 90906 26209</a>
          </div>
          <div>
            <div style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', color: 'var(--color-gray-400)', letterSpacing: 'var(--ls-wider)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Mail size={14} color="var(--color-primary)" /> Email
            </div>
            <a href="mailto:hello@magnusofficefurniture.com" style={{ color: 'var(--color-primary)', fontWeight: 'var(--fw-medium)', textDecoration: 'none' }}>hello@magnusofficefurniture.com</a>
          </div>
          <div>
            <div style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', color: 'var(--color-gray-400)', letterSpacing: 'var(--ls-wider)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Globe size={14} color="var(--color-primary)" /> Website
            </div>
            <a href="https://magnusofficefurniture.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 'var(--fw-medium)', textDecoration: 'none' }}>magnusofficefurniture.com</a>
          </div>
          <div>
            <div style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', color: 'var(--color-gray-400)', letterSpacing: 'var(--ls-wider)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={14} color="var(--color-primary)" /> Showroom Hours
            </div>
            <div style={{ color: 'var(--color-dark)', fontWeight: 'var(--fw-medium)' }}>
              Monday – Sunday: <span style={{ color: 'var(--color-primary)' }}>10:00 AM – 7:00 PM</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', color: 'var(--color-gray-400)', letterSpacing: 'var(--ls-wider)', marginBottom: 6 }}>
              Services & Amenities
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['In-Store Shopping', 'Delivery Available', 'Corporate Office Furniture Consultation', 'LGBTQ+ Friendly', 'Premium Office Furniture Showroom'].map((service, i) => (
                <span key={i} style={{ fontSize: 'var(--fs-xs)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--color-gray-100)', color: 'var(--color-gray-700)', border: '1px solid var(--color-gray-200)', fontWeight: 'var(--fw-medium)' }}>
                  {service}
                </span>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', color: 'var(--color-gray-400)', letterSpacing: 'var(--ls-wider)' }}>
              Follow Us
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="https://wa.me/919090626209" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '10px 20px', borderRadius: 'var(--radius-md)', fontWeight: 'var(--fw-semibold)', textDecoration: 'none', fontSize: 'var(--fs-small)' }}>
                <MessageSquare size={16} fill="#fff" /> WhatsApp
              </a>
              <a href="https://www.instagram.com/magnusofficefurniture?igsh=dnFiNG92NWt0d3Vs" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: '#fff', padding: '10px 20px', borderRadius: 'var(--radius-md)', fontWeight: 'var(--fw-semibold)', textDecoration: 'none', fontSize: 'var(--fs-small)' }}>
                <InstagramIcon size={16} /> Instagram
              </a>
              <a href="https://youtube.com/@magnusofficefurniture?si=zBJOfreHx3hGS2Lv" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FF0000', color: '#fff', padding: '10px 20px', borderRadius: 'var(--radius-md)', fontWeight: 'var(--fw-semibold)', textDecoration: 'none', fontSize: 'var(--fs-small)' }}>
                <YoutubeIcon size={16} /> YouTube
              </a>
              <a href="https://www.linkedin.com/company/magnus-office-furniture/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0A66C2', color: '#fff', padding: '10px 20px', borderRadius: 'var(--radius-md)', fontWeight: 'var(--fw-semibold)', textDecoration: 'none', fontSize: 'var(--fs-small)' }}>
                <LinkedinIcon size={16} /> LinkedIn
              </a>
              <a href="https://www.facebook.com/magnusofficefurniture/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1877F2', color: '#fff', padding: '10px 20px', borderRadius: 'var(--radius-md)', fontWeight: 'var(--fw-semibold)', textDecoration: 'none', fontSize: 'var(--fs-small)' }}>
                <FacebookIcon size={16} /> Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Magnus Showroom Location Card */}
      {/* ── Ambient glow wrapper — does not clip the card ── */}
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Soft champagne ambient glow behind the card */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: -24,
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.10) 0%, transparent 70%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
            zIndex: 0,
            borderRadius: 32,
          }}
        />

        {/* ── Card shell ── */}
        <div
          className="magnus-map-card"
          style={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            minHeight: 520,
            borderRadius: 20,
            border: '1px solid rgba(212,175,55,0.30)',
            boxShadow:
              '0 2px 6px rgba(62,39,35,0.04), 0 10px 32px rgba(62,39,35,0.10), 0 0 0 1px rgba(212,175,55,0.06)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition:
              'border-color 400ms var(--ease-in-out), box-shadow 400ms var(--ease-in-out), transform 400ms var(--ease-in-out)',
            background: '#fff',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = 'rgba(212,175,55,0.72)';
            el.style.boxShadow =
              '0 4px 12px rgba(62,39,35,0.06), 0 22px 55px rgba(62,39,35,0.18), 0 0 0 1px rgba(212,175,55,0.18)';
            el.style.transform = 'translateY(-4px)';
            const dirLink = el.querySelector<HTMLElement>('.map-dir-link');
            if (dirLink) dirLink.style.color = '#D4AF37';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = 'rgba(212,175,55,0.30)';
            el.style.boxShadow =
              '0 2px 6px rgba(62,39,35,0.04), 0 10px 32px rgba(62,39,35,0.10), 0 0 0 1px rgba(212,175,55,0.06)';
            el.style.transform = 'translateY(0)';
            const dirLink = el.querySelector<HTMLElement>('.map-dir-link');
            if (dirLink) dirLink.style.color = 'var(--color-primary)';
          }}
        >

          {/* ── Header: Walnut Charcoal ── */}
          <div style={{
            background: 'linear-gradient(135deg, #130f0c 0%, #1e1814 60%, #2a2118 100%)',
            borderBottom: '1px solid rgba(212,175,55,0.18)',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexShrink: 0,
          }}>
            {/* Left: Monogram + Location text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <MagnusMonogram
                size={28}
                borderRadius={6}
                style={{ flexShrink: 0, opacity: 0.92 }}
              />
              <div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#D4AF37',
                  lineHeight: 1,
                  marginBottom: 3,
                }}>
                  Magnus Showroom
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1,
                }}>
                  <MapPin size={11} color="rgba(212,175,55,0.65)" strokeWidth={2} />
                  Kondapur, Hyderabad
                </div>
              </div>
            </div>

            {/* Right: Open in Maps */}
            <a
              href="https://maps.google.com/?q=Magnus+Office+Furniture+Kondapur+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                background: 'rgba(212,175,55,0.10)',
                border: '1px solid rgba(212,175,55,0.28)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: '#D4AF37',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 250ms ease, border-color 250ms ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212,175,55,0.20)';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(212,175,55,0.10)';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.28)';
              }}
            >
              Open in Google Maps <ExternalLink size={11} strokeWidth={2.5} />
            </a>
          </div>

          {/* ── Map iframe (unchanged) ── */}
          <iframe
            src="https://maps.google.com/maps?q=Magnus%20Office%20Furniture%20Kondapur%20Hyderabad&t=&z=16&ie=UTF8&iwloc=&output=embed"
            style={{ border: 0, width: '100%', flex: 1, minHeight: 430, display: 'block', pointerEvents: 'none' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Magnus Office Furniture Showroom Location Map"
          ></iframe>

          {/* ── Bottom bar ── */}
          <a
            href="https://maps.google.com/?q=Magnus+Office+Furniture+Kondapur+Hyderabad"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              padding: '13px 18px',
              background: '#FDFCF8',
              borderTop: '1px solid rgba(212,175,55,0.14)',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--color-dark)',
                lineHeight: 1.3,
                marginBottom: 2,
              }}>
                Magnus Office Furniture
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--color-gray-500)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                lineHeight: 1,
              }}>
                <MapPin size={11} color="var(--color-gray-400)" strokeWidth={2} />
                Kondapur, Hyderabad · Opposite Sarath City
              </div>
            </div>
            <div
              className="map-dir-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                whiteSpace: 'nowrap',
                transition: 'color 400ms var(--ease-in-out)',
                letterSpacing: '0.01em',
              }}
            >
              Get Directions <ExternalLink size={13} strokeWidth={2.5} />
            </div>
          </a>
        </div>
      </div>
    </div>

    {/* DIVIDER */}
    <hr style={{ border: 0, borderTop: '1px solid var(--color-gray-200)', margin: 'var(--space-12) 0' }} />

    {/* MID SECTION: WHY CHOOSE MAGNUS & QUICK CONTACT */}
    <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
      {/* Card 1: Why Choose Magnus? */}
      <div style={{ padding: 'var(--space-6)', background: 'var(--color-cream)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)' }}>
        <h4 style={{ fontSize: 'var(--fs-h4)', fontFamily: 'var(--font-heading)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-primary)', marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Award size={20} color="var(--color-accent)" /> Why Choose Magnus?
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {[
            { title: '⭐ 4.9 Google Rating', desc: 'Highly rated by local businesses for product excellence.' },
            { title: '17 Verified Customer Reviews', desc: '100% genuine feedback from corporate workspaces.' },
            { title: 'Premium Office Furniture Solutions', desc: 'Combining durability, elegance, and perfect ergonomics.' },
            { title: 'Delivery Available', desc: 'Safe, punctual delivery right to your office space.' },
            { title: 'Expert Workspace Consultation', desc: 'Helping you design and optimize your floor layouts.' },
            { title: 'Quality-Assured Products', desc: 'Strict inspection to guarantee lasting structure and comfort.' },
            { title: 'Personalized Customer Support', desc: 'We assist with selection, setups, and post-purchase care.' },
          ].map((item, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: 18, marginTop: -2 }}>•</span>
              <div>
                <div style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--color-dark)', fontSize: 'var(--fs-body)' }}>{item.title}</div>
                <div style={{ color: 'var(--color-gray-500)', fontSize: 'var(--fs-small)' }}>{item.desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Card 2: Quick Contact & Enquiries */}
      <div style={{ padding: 'var(--space-6)', background: 'var(--color-cream)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)' }}>
        <h4 style={{ fontSize: 'var(--fs-h4)', fontFamily: 'var(--font-heading)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-primary)', marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Clock size={20} /> Quick Contact Info
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {[
            { title: 'Response during business hours', desc: 'Our team is active and responsive from 10:00 AM – 7:00 PM every day.' },
            { title: 'WhatsApp Support Available', desc: 'Chat directly for prompt inquiries, pricing brochures, and catalogs.' },
            { title: 'Corporate & Bulk Enquiries Welcome', desc: 'Special custom pricing and designs available for corporate office layouts.' },
            { title: 'Visit Showroom for Assistance', desc: 'Drop by to feel the furniture comfort, build quality, and consult with planners.' },
          ].map((item, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ color: 'var(--color-primary)', display: 'inline-block', marginTop: 2 }}>
                <CheckCircle2 size={16} color="var(--color-success)" />
              </span>
              <div>
                <div style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--color-dark)', fontSize: 'var(--fs-body)' }}>{item.title}</div>
                <div style={{ color: 'var(--color-gray-500)', fontSize: 'var(--fs-small)', marginTop: 2 }}>{item.desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* DIVIDER */}
    <hr style={{ border: 0, borderTop: '1px solid var(--color-gray-200)', margin: 'var(--space-12) 0' }} />

    {/* CUSTOMER REVIEWS */}
    <div style={{ marginBottom: 'var(--space-12)' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <h3 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-heading)', color: 'var(--color-dark)', marginBottom: 'var(--space-2)' }}>
          Verified Google Reviews
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, fontSize: 'var(--fs-body)' }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="var(--color-accent)" stroke="var(--color-accent)" />
            ))}
          </div>
          <span style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--color-dark)' }}>4.9 / 5</span>
          <span style={{ color: 'var(--color-gray-500)' }}>Based on 17 Google Reviews</span>
        </div>
      </div>

      <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
        {[
          {
            name: 'Sameer Kumar',
            rating: 5,
            review: 'The quality of the furniture is exceptional – sturdy, stylish, and ergonomically designed. It has completely transformed our workspace, making it more functional and visually appealing.',
          },
          {
            name: 'Jyothsna Sree',
            rating: 5,
            review: 'They do have a wide variety of office furniture. They do not compromise on quality. The responses were always prompt and welcoming. Overall it was a very great experience with Magnus Office Furniture.',
          },
          {
            name: 'Mohan Varma Penumetsa',
            rating: 5,
            review: 'Customer service is very nice. The staff is patient and helped us choose the right furniture. Thank you Magnus Office Furniture.',
          },
        ].map((rev, idx) => (
          <div
            key={idx}
            style={{
              padding: 'var(--space-6)',
              background: 'var(--color-white)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-gray-200)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', gap: 2, marginBottom: 'var(--space-4)' }}>
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="var(--color-accent)" stroke="var(--color-accent)" />
                ))}
              </div>
              <p style={{ color: 'var(--color-gray-700)', fontSize: 'var(--fs-small)', lineHeight: 'var(--lh-relaxed)', fontStyle: 'italic', margin: 0 }}>
                "{rev.review}"
              </p>
            </div>
            <div style={{ marginTop: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-primary-bg)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-small)' }}>
                {rev.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--color-dark)', fontSize: 'var(--fs-small)' }}>{rev.name}</div>
                <div style={{ color: 'var(--color-gray-400)', fontSize: 11 }}>Verified Google Reviewer</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* PREMIUM CALL TO ACTION */}
    <div style={{
      padding: 'var(--space-10) var(--space-8)',
      background: 'var(--color-primary)',
      borderRadius: 'var(--radius-lg)',
      textAlign: 'center',
      color: 'var(--color-white)',
      boxShadow: 'var(--shadow-lg)',
      marginTop: 'var(--space-8)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <div style={{
        fontSize: 'var(--fs-xs)',
        fontWeight: 'var(--fw-semibold)',
        color: 'var(--color-accent)',
        letterSpacing: 'var(--ls-wider)',
        textTransform: 'uppercase',
        marginBottom: 'var(--space-2)',
      }}>Get in Touch Today</div>
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--fs-h2)',
        fontWeight: 'var(--fw-semibold)',
        color: 'var(--color-cream)',
        marginBottom: 'var(--space-4)',
      }}>
        Ready to Transform Your Workspace?
      </h3>
      <p style={{
        maxWidth: 680,
        margin: '0 auto var(--space-8) auto',
        fontSize: 'var(--fs-body)',
        color: 'var(--color-gray-300)',
        lineHeight: 'var(--lh-relaxed)',
      }}>
        Visit our showroom, request a call back from our layout sales team, message us on WhatsApp, or schedule a formal furniture consultation with our workspace design experts.
      </p>
      <div className="cta-buttons" style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <Button
          variant="outline"
          style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)', background: 'transparent' }}
          href="https://maps.google.com/?q=Magnus+Office+Furniture+Kondapur+Hyderabad"
          target="_blank"
        >
          <MapPin size={16} /> Visit Showroom
        </Button>
        <Button
          variant="primary"
          style={{ background: 'var(--color-white)', color: 'var(--color-primary)' }}
          href="tel:+919090626209"
        >
          <Phone size={16} /> Call Sales Team
        </Button>
        <Button
          variant="whatsapp"
          href="https://wa.me/919090626209"
          target="_blank"
        >
          <MessageSquare size={16} /> Chat on WhatsApp
        </Button>
        <Button
          variant="outline"
          style={{ borderColor: 'var(--color-white)', color: 'var(--color-white)' }}
          href="mailto:hello@magnusofficefurniture.com?subject=Office%20Furniture%20Consultation%20Request"
        >
          <Mail size={16} /> Schedule Consultation
        </Button>
      </div>
    </div>

    {/* Responsive layout styles override */}
    <style>{`
      @media (max-width: 900px) {
        .contact-grid { grid-template-columns: 1fr !important; gap: var(--space-8) !important; }
        .info-grid { grid-template-columns: 1fr !important; gap: var(--space-8) !important; }
        .reviews-grid { grid-template-columns: 1fr !important; gap: var(--space-6) !important; }
        .cta-buttons { flex-direction: column !important; align-items: stretch !important; gap: var(--space-3) !important; }
      }
    `}</style>
  </SimplePage>
);
