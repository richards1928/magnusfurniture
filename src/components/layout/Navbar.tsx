import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { MagnusWordmark } from '../ui/MagnusLogo';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Custom Furniture', path: '/custom-furniture' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-height)',
        zIndex: 'var(--z-sticky)',
        background: '#FFFFFF',
        backdropFilter: 'blur(16px) saturate(180%)',
        borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(0, 0, 0, 0.05)',
        transition: 'all var(--duration-normal) var(--ease-in-out)',
        boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.08)' : 'none',
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <MagnusWordmark height={38} color="dark" />
          </Link>

          {/* Desktop Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-8)',
          }} className="nav-desktop">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path || 
                (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: 'var(--fs-small)',
                    fontWeight: isActive ? 'var(--fw-semibold)' : 'var(--fw-medium)',
                    color: isActive ? '#D4AF37' : '#32140D',
                    textDecoration: 'none',
                    position: 'relative',
                    paddingBottom: 4,
                    transition: 'color var(--duration-fast) var(--ease-in-out)',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: 'var(--color-accent)',
                        borderRadius: 1,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <a
              href="tel:9090626207"
              className="nav-desktop"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--fs-small)',
                fontWeight: 'var(--fw-semibold)',
                color: 'var(--color-walnut-dark)',
                background: 'var(--color-accent)',
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                transition: 'all var(--duration-fast) var(--ease-in-out)',
                boxShadow: '0 2px 10px rgba(212, 175, 55, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(212, 175, 55, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(212, 175, 55, 0.3)';
              }}
            >
              <Phone size={14} />
              Get a Quote
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="nav-mobile-toggle"
              aria-label="Toggle menu"
              style={{
                display: 'none',
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                color: '#32140D',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 'var(--nav-height)',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(50, 20, 13, 0.98)',
              backdropFilter: 'blur(20px)',
              zIndex: 'var(--z-overlay)',
              display: 'flex',
              flexDirection: 'column',
              padding: 'var(--space-8) var(--side-padding)',
              gap: 'var(--space-2)',
            }}
          >
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    style={{
                      display: 'block',
                      padding: 'var(--space-4) 0',
                      fontSize: 'var(--fs-h4)',
                      fontWeight: isActive ? 'var(--fw-semibold)' : 'var(--fw-regular)',
                      color: isActive ? 'var(--color-accent)' : '#F5F1E8',
                      borderBottom: '1px solid rgba(212, 175, 55, 0.12)',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
            <a
              href="tel:9090626207"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                marginTop: 'var(--space-6)',
                padding: '14px 28px',
                background: 'var(--color-accent)',
                color: 'var(--color-walnut-dark)',
                borderRadius: 'var(--radius-full)',
                fontWeight: 'var(--fw-semibold)',
                fontSize: 'var(--fs-body)',
              }}
            >
              <Phone size={16} />
              Get a Quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS injected via <style> tag */}
      <style>{`
        @media (max-width: 1024px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .nav-mobile-toggle { display: none !important; }
        }
      `}</style>
    </>
  );
}
