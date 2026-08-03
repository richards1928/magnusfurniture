import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function AboutHero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background:
          'linear-gradient(135deg,#0b0b0b 0%,#17130F 45%,#111111 100%)',
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'rgba(212,175,55,.08)',
          filter: 'blur(120px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-120px',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'rgba(212,175,55,.05)',
          filter: 'blur(120px)',
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '140px 24px',
        }}
      >
        <div style={{ maxWidth: 760 }}>
          <div
            style={{
              display: 'inline-block',
              marginBottom: 20,
              color: 'var(--color-primary)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 600,
              fontSize: '.82rem',
            }}
          >
            About Magnus Office Furniture
          </div>

          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(3rem,7vw,5.8rem)',
              lineHeight: 1,
              fontWeight: 700,
              marginBottom: 28,
              maxWidth: 900,
            }}
          >
            Crafting
            <br />
            Inspiring
            <br />
            Workspaces.
          </h1>

          <p
            style={{
              fontSize: '1.18rem',
              color: 'rgba(255,255,255,.72)',
              lineHeight: 1.8,
              maxWidth: 650,
              marginBottom: 42,
            }}
          >
            Magnus Office Furniture creates premium workspace solutions that
            combine design, comfort, ergonomics and functionality for modern
            businesses across India.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 18,
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '16px 30px',
                background: 'var(--color-primary)',
                color: '#111',
                textDecoration: 'none',
                borderRadius: 999,
                fontWeight: 600,
              }}
            >
              Explore Collection
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 30px',
                border: '1px solid rgba(212,175,55,.35)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: 999,
              }}
            >
              Contact Us
            </Link>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 50,
              flexWrap: 'wrap',
              marginTop: 70,
            }}
          >
            <div>
              <div
                style={{
                  color: 'var(--color-primary)',
                  fontSize: '2rem',
                  fontWeight: 700,
                }}
              >
                116+
              </div>

              <div
                style={{
                  color: 'rgba(255,255,255,.55)',
                }}
              >
                Premium Products
              </div>
            </div>

            <div>
              <div
                style={{
                  color: 'var(--color-primary)',
                  fontSize: '2rem',
                  fontWeight: 700,
                }}
              >
                11
              </div>

              <div
                style={{
                  color: 'rgba(255,255,255,.55)',
                }}
              >
                Product Categories
              </div>
            </div>

            <div>
              <div
                style={{
                  color: 'var(--color-primary)',
                  fontSize: '2rem',
                  fontWeight: 700,
                }}
              >
                100%
              </div>

              <div
                style={{
                  color: 'rgba(255,255,255,.55)',
                }}
              >
                Customized Solutions
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}