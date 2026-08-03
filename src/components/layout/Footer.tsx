import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-6)' }}>
            <div
  style={{
    width: 40,
    height: 40,
    background: 'linear-gradient(135deg, #D4AF37 0%, #B68D2A 100%)',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#111', // ✅ Dark letter for better contrast
    fontFamily: 'var(--font-heading)',
    fontWeight: 'var(--fw-bold)',
    fontSize: '1.25rem',
    boxShadow: '0 6px 18px rgba(212,175,55,.25)', // ✨ Premium touch
  }}
>
  M
</div>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--fw-bold)',
                fontSize: '1.1rem',
                color: '#fff',
                letterSpacing: 'var(--ls-wide)',
              }}>MAGNUS</div>
              <div style={{
                fontSize: 'var(--fs-xs)',
                letterSpacing: 'var(--ls-wider)',
                textTransform: 'uppercase',
                color: 'var(--color-gray-500)',
              }}>OFFICE FURNITURE</div>
              <div
  style={{
    marginTop: '6px',
    fontSize: '0.72rem',
    color: 'var(--color-primary)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  }}
>
  Premium Workspace Solutions
</div>
            </div>
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
            © {new Date().getFullYear()} Magnus Office Furniture. All rights reserved.
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
