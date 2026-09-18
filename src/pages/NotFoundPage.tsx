import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div
      style={{
        background: 'var(--color-warm-white, #FFFDF8)',
        minHeight: 'calc(100vh - var(--nav-height, 80px))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'calc(var(--nav-height, 80px) + var(--space-8, 32px)) var(--space-4, 16px) var(--space-16, 64px)',
      }}
    >
      <div
        style={{
          maxWidth: 560,
          width: '100%',
          textAlign: 'center',
          background: 'var(--color-white, #ffffff)',
          border: '1px solid var(--color-gray-200, #E5E5E5)',
          borderRadius: 'var(--radius-xl, 20px)',
          padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 40px)',
          boxShadow: 'var(--shadow-md, 0 8px 30px rgba(0,0,0,0.06))',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(4rem, 10vw, 6.5rem)',
            fontWeight: 800,
            lineHeight: 1,
            color: 'var(--color-accent, #D4AF37)',
            marginBottom: 'var(--space-2, 8px)',
            letterSpacing: '-0.03em',
          }}
        >
          404
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
            fontWeight: 700,
            color: 'var(--color-dark, #1A1A1A)',
            marginBottom: 'var(--space-3, 12px)',
            lineHeight: 1.25,
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            fontSize: 'var(--fs-body, 1rem)',
            color: 'var(--color-gray-600, #666666)',
            lineHeight: 'var(--lh-relaxed, 1.6)',
            marginBottom: 'var(--space-8, 32px)',
            maxWidth: 440,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--space-3, 12px)',
          }}
        >
          <Button href="/" variant="primary">
            <Home size={16} /> Return to Home
          </Button>

          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              fontSize: 'var(--fs-body, 1rem)',
              fontWeight: 'var(--fw-medium, 500)',
              color: 'var(--color-primary, #5A321C)',
              background: 'transparent',
              border: '1.5px solid var(--color-primary, #5A321C)',
              borderRadius: 'var(--radius-md, 8px)',
              textDecoration: 'none',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
          >
            <ArrowLeft size={16} /> Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
