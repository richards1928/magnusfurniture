import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { MagnusWordmark } from '../ui/MagnusLogo';

const footerLinks = {
  'Quick Links': [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ],
  'Services': [
    { label: 'Workspace Design', path: '/custom-furniture' },
    { label: 'Workspace Designer', path: '/designer' },
    { label: 'Office Planning', path: '/services' },
    { label: 'Corporate Projects', path: '/services' },
  ],
  'Categories': [
    { label: 'Executive Chairs', path: '/categories/executive-chairs' },
    { label: 'Workstations', path: '/categories/workstations' },
    { label: 'Conference Tables', path: '/categories/conference-tables' },
    { label: 'Office Storage', path: '/categories/office-storage' },
    { label: 'Modular Furniture', path: '/categories/modular-office-furniture' },
  ],
};

export function Footer() {
  return (
   <footer
  style={{
    background: 'linear-gradient(180deg,#0b0b0b 0%,#121212 100%)',
    color: 'var(--color-gray-400)',
    borderTop: '2px solid rgba(212,175,55,.35)',
    position: 'relative',
    overflow: 'hidden',
  }}
>

  {/* Main Footer */}
<div
  className="container"
  style={{
    paddingTop: 'var(--space-16)',
    paddingBottom: 'var(--space-12)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 'var(--space-10)',
  }}
>
        {/* Brand Column */}
        <div>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <MagnusWordmark height={42} color="white" />
          </div>
          <p style={{ fontSize: 'var(--fs-body)', color: 'var(--color-gray-400)', lineHeight: 'var(--lh-relaxed)', marginBottom: 'var(--space-8)', maxWidth: 320 }}>
            Premium office furniture solutions that combine comfort, productivity, aesthetics, and durability for modern workspaces.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <a href="tel:+919090626209" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--fs-small)', color: 'var(--color-gray-400)' }}>
              <Phone size={14} /> +91 90906 26209
            </a>
            <a href="mailto:hello@magnusofficefurniture.com" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--fs-small)', color: 'var(--color-gray-400)' }}>
              <Mail size={14} /> hello@magnusofficefurniture.com
            </a>
            <span style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--fs-small)' }}>
              <MapPin size={14} style={{ flexShrink: 0, marginTop: 4 }} /> 
              <span>
                M R Elite, 3rd Floor,<br/>
                Opposite Sarath City, Kondapur,<br/>
                Hyderabad - 500084
              </span>
            </span>
          </div>
        </div>

        {/* Link Columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4
  style={{
    fontFamily: 'var(--font-heading)',
    color: 'var(--color-primary)', // ✅ Gold
    fontSize: 'var(--fs-body-lg)',
    fontWeight: 'var(--fw-semibold)',
    marginBottom: 'var(--space-6)',
    letterSpacing: 'var(--ls-wide)',
    textTransform: 'uppercase',
  }}
>
  {heading}
</h4>
<div
  style={{
    width: '40px',
    height: '2px',
    background: 'var(--color-primary)',
    marginBottom: 'var(--space-5)',
    borderRadius: '999px',
  }}
/>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {links.map(link => (
                <li key={link.label}>
                  <Link to={link.path} style={{
                    fontSize: 'var(--fs-body)',
                    color: 'var(--color-gray-400)',
                    transition: 'color var(--duration-fast) var(--ease-in-out)',
                  }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* Business Hours */}
<div>
  <h4
    style={{
      fontFamily: 'var(--font-heading)',
      color: 'var(--color-primary)',
      fontSize: 'var(--fs-body-lg)',
      fontWeight: 'var(--fw-semibold)',
      marginBottom: 'var(--space-6)',
      letterSpacing: 'var(--ls-wide)',
      textTransform: 'uppercase',
    }}
  >
    Business Hours
  </h4>

  <div
    style={{
      width: '40px',
      height: '2px',
      background: 'var(--color-primary)',
      marginBottom: 'var(--space-5)',
      borderRadius: '999px',
    }}
  />

  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
    }}
  >
    <Clock
      size={18}
      color="var(--color-primary)"
      style={{ marginTop: 2 }}
    />

    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        fontSize: 'var(--fs-body)',
        color: 'var(--color-gray-400)',
        lineHeight: 1.7,
      }}
    >
      <div>
        <strong style={{ color: '#fff' }}>
          Monday – Saturday
        </strong>
        <br />
        10:00 AM – 7:30 PM
      </div>

      <div>
        <strong style={{ color: '#fff' }}>
          Sunday
        </strong>
        <br />
        Closed
      </div>

      <div
        style={{
          color: 'var(--color-primary)',
          fontWeight: 500,
        }}
      >
        Corporate Visits
        <br />
        By Appointment
      </div>
    </div>
  </div>
</div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container" style={{
          paddingTop: 'var(--space-6)',
          paddingBottom: 'var(--space-6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}>
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-gray-500)' }}>
            © {new Date().getFullYear()} Magnus Office Furniture. Crafting Premium Workspaces Across India.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <a
  href="https://wa.me/919090626209"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="WhatsApp"
  style={{
    width: 42,
    height: 42,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(212,175,55,.08)",
    border: "1px solid rgba(212,175,55,.25)",
    color: "var(--color-primary)",
    textDecoration: "none",
    transition: "all .3s ease",
    cursor: "pointer",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "var(--color-primary)";
    e.currentTarget.style.color = "#111";
    e.currentTarget.style.transform = "translateY(-3px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "rgba(212,175,55,.08)";
    e.currentTarget.style.color = "var(--color-primary)";
    e.currentTarget.style.transform = "translateY(0)";
  }}
>
  <ArrowUpRight size={18} />
</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
