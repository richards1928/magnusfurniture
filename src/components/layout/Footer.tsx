import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight, ArrowUp, MessageCircle } from 'lucide-react';
import { MagnusWordmark } from '../ui/MagnusLogo';

/* ─── Static data ─────────────────────────────────────────────── */

const quickLinks = [
  { label: 'Home',              path: '/' },
  { label: 'About Us',         path: '/about' },
  { label: 'Products',         path: '/products' },
  { label: 'Services',         path: '/services' },
  { label: 'Gallery',          path: '/gallery' },
  { label: 'Custom Furniture', path: '/custom-furniture' },
  { label: 'Contact',          path: '/contact' },
];

const MAPS_URL =
  'https://maps.google.com/?q=M+R+Elite+3rd+Floor+Above+BKP+Homes+Opposite+Sarath+City+Kondapur+Hyderabad+500084';

/* ─── Tiny helper: uppercase gold column heading ──────────────── */

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#D4AF37',
        marginBottom: 22,
        lineHeight: 1,
      }}
    >
      {children}
    </p>
  );
}

/* ─── Sub-label used inside col-3 blocks ─────────────────────── */

function BlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: '#D4AF37',
        marginBottom: 6,
        lineHeight: 1,
      }}
    >
      {children}
    </p>
  );
}

/* ─── A single quick-link row ─────────────────────────────────── */

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <li>
      <Link
        to={to}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: 'block',
          fontSize: '0.975rem',
          lineHeight: 1,
          color: hov ? '#D4AF37' : 'rgba(255,255,255,0.65)',
          transform: hov ? 'translateX(4px)' : 'translateX(0)',
          transition: 'color 0.2s ease, transform 0.2s ease',
          textDecoration: 'none',
        }}
      >
        {children}
      </Link>
    </li>
  );
}

/* ─── Clickable contact line (phone / email / address) ────────── */

function ContactLine({
  href,
  icon,
  children,
}: {
  href?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 14,
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: hov && href ? '#D4AF37' : 'rgba(255,255,255,0.62)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: href ? 'pointer' : 'default',
  };

  const iconWrap: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'rgba(212,175,55,0.09)',
    border: '1px solid rgba(212,175,55,0.2)',
    color: '#D4AF37',
    flexShrink: 0,
    marginTop: 2,
  };

  const inner = (
    <>
      <span style={iconWrap}>{icon}</span>
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={baseStyle}
      >
        {inner}
      </a>
    );
  }
  return <div style={baseStyle}>{inner}</div>;
}

/* ─── Main Export ─────────────────────────────────────────────── */

export function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <>
      {/* ── Responsive overrides ──────────────────────────── */}
      <style>{`
        /* Hover on social icons */
        .mf-social:hover {
          background: #D4AF37 !important;
          color: #111 !important;
          border-color: #D4AF37 !important;
          transform: translateY(-2px) !important;
        }

        /* Tablet: 2 cols, brand spans full */
        @media (max-width: 1060px) {
          .mf-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .mf-col-brand {
            grid-column: 1 / -1 !important;
            padding-right: 0 !important;
            border-right: none !important;
            padding-bottom: 52px !important;
            border-bottom: 1px solid rgba(255,255,255,0.07) !important;
          }
          .mf-col-links,
          .mf-col-contact {
            padding-top: 48px !important;
          }
        }

        /* Mobile: single column */
        @media (max-width: 640px) {
          .mf-grid {
            grid-template-columns: 1fr !important;
          }
          .mf-col-brand {
            grid-column: auto !important;
            padding-bottom: 48px !important;
          }
          .mf-col-links {
            border-right: none !important;
            padding-right: 0 !important;
          }
          .mf-bottom-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .mf-col-links,
          .mf-col-contact {
            padding-top: 40px !important;
          }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════ */}
      {/*  FOOTER                                                  */}
      {/* ════════════════════════════════════════════════════════ */}
      <footer
        style={{
          background: '#0e0e0e',
          color: 'rgba(255,255,255,0.62)',
          borderTop: '1px solid rgba(212,175,55,0.22)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle ambient glow at top */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 260px at 50% 0%,' +
              'rgba(212,175,55,0.055) 0%,transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* ─── Three-column main content ──────────────────── */}
        <div
          className="container mf-grid"
          style={{
            maxWidth: 1360,
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.8fr 1fr',
            columnGap: 'clamp(32px, 5vw, 80px)',
            paddingTop: 88,
            paddingBottom: 80,
            alignItems: 'start',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* ══ COLUMN 1 — BRAND + CONTACT ══════════════════ */}
          <div
            className="mf-col-brand"
            style={{
              paddingRight: 'clamp(20px, 4vw, 60px)',
              borderRight: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Wordmark */}
            <Link to="/" style={{ display: 'inline-block', marginBottom: 28 }}>
              <MagnusWordmark height={52} color="white" />
            </Link>

            {/* Tagline */}
            <p
              style={{
                fontSize: '0.975rem',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.5)',
                maxWidth: 340,
                marginBottom: 40,
              }}
            >
              Premium office furniture solutions that combine comfort, productivity,
              aesthetics, and durability for modern workspaces.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 44 }}>
              <ContactLine href="tel:+919090626209" icon={<Phone size={14} />}>
                +91 90906 26209
              </ContactLine>

              <ContactLine href="mailto:hello@magnusofficefurniture.com" icon={<Mail size={14} />}>
                hello@magnusofficefurniture.com
              </ContactLine>

              <ContactLine icon={<MapPin size={14} />}>
                M R Elite, 3rd Floor,
                <br />
                Above BKP Homes, Opposite Sarath City,
                <br />
                Ratnadeep Right Side Lane, Kondapur,
                <br />
                Hyderabad, Telangana – 500084
              </ContactLine>
            </div>

            {/* Social — WhatsApp (only confirmed real link) */}
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href="https://wa.me/919090626209"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="mf-social"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.22)',
                  color: '#D4AF37',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  flexShrink: 0,
                }}
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </div>

          {/* ══ COLUMN 2 — QUICK LINKS ══════════════════════ */}
          <div
            className="mf-col-links"
            style={{
              paddingRight: 'clamp(16px, 3vw, 48px)',
              borderRight: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <ColHeading>Quick Links</ColHeading>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {quickLinks.map(l => (
                <NavLink key={l.path} to={l.path}>
                  {l.label}
                </NavLink>
              ))}
            </ul>
          </div>

          {/* ══ COLUMN 3 — CONTACT & LOCATIONS ══════════════ */}
          <div className="mf-col-contact">
            <ColHeading>Contact &amp; Locations</ColHeading>

            {/* ── Main Showroom block ── */}
            <div style={{ marginBottom: 32 }}>
              <BlockLabel>Main Showroom</BlockLabel>
              <p
                style={{
                  fontSize: '0.975rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.88)',
                  marginBottom: 4,
                  lineHeight: 1.45,
                }}
              >
                Magnus Office Furniture
              </p>
              <p
                style={{
                  fontSize: '0.93rem',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: 10,
                  lineHeight: 1.5,
                }}
              >
                Kondapur, Hyderabad
              </p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#D4AF37',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.75'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                View Location <ArrowUpRight size={13} strokeWidth={2.5} />
              </a>
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: 'rgba(255,255,255,0.07)',
                marginBottom: 28,
              }}
            />

            {/* ── Phone block ── */}
            <div style={{ marginBottom: 24 }}>
              <BlockLabel>Phone</BlockLabel>
              <a
                href="tel:+919090626209"
                style={{
                  fontSize: '0.975rem',
                  color: 'rgba(255,255,255,0.72)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  display: 'block',
                  lineHeight: 1.5,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.72)'; }}
              >
                +91 90906 26209
              </a>
            </div>

            {/* ── Email block ── */}
            <div style={{ marginBottom: 28 }}>
              <BlockLabel>Email</BlockLabel>
              <a
                href="mailto:hello@magnusofficefurniture.com"
                style={{
                  fontSize: '0.92rem',
                  color: 'rgba(255,255,255,0.72)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  display: 'block',
                  lineHeight: 1.5,
                  wordBreak: 'break-word',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.72)'; }}
              >
                hello@magnusofficefurniture.com
              </a>
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: 'rgba(255,255,255,0.07)',
                marginBottom: 28,
              }}
            />

            {/* ── Business Hours block ── */}
            <div>
              <BlockLabel>Business Hours</BlockLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <p style={{ fontSize: '0.93rem', color: 'rgba(255,255,255,0.82)', fontWeight: 500, lineHeight: 1.4 }}>
                    Monday – Saturday
                  </p>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.4 }}>
                    10:00 AM – 7:30 PM
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '0.93rem', color: 'rgba(255,255,255,0.82)', fontWeight: 500, lineHeight: 1.4 }}>
                    Sunday
                  </p>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', lineHeight: 1.4 }}>
                    Closed
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '0.88rem', color: '#D4AF37', fontWeight: 500, lineHeight: 1.4 }}>
                    Corporate Visits — By Appointment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Bottom copyright bar ───────────────────────── */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            className="container mf-bottom-bar"
            style={{
              maxWidth: 1360,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              paddingTop: 22,
              paddingBottom: 22,
              gap: 12,
            }}
          >
            <p
              style={{
                fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.32)',
                lineHeight: 1.5,
              }}
            >
              © {new Date().getFullYear()} Magnus Office Furniture.{' '}
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>
                Crafting Premium Workspaces Across India.
              </span>
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                title="Coming soon"
                style={{
                  fontSize: '0.82rem',
                  color: 'rgba(255,255,255,0.3)',
                  cursor: 'default',
                }}
              >
                Privacy Policy
              </span>
              <span
                style={{
                  width: 1,
                  height: 12,
                  background: 'rgba(255,255,255,0.15)',
                  display: 'inline-block',
                }}
              />
              <span
                title="Coming soon"
                style={{
                  fontSize: '0.82rem',
                  color: 'rgba(255,255,255,0.3)',
                  cursor: 'default',
                }}
              >
                Terms &amp; Conditions
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Back-to-top button ─────────────────────────────── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: '#D4AF37',
          color: '#111',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 990,
          boxShadow: '0 4px 18px rgba(212,175,55,0.38)',
          transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
          opacity: showTop ? 1 : 0,
          pointerEvents: showTop ? 'auto' : 'none',
          transform: showTop ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.85)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.08)';
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(212,175,55,0.55)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 18px rgba(212,175,55,0.38)';
        }}
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}
