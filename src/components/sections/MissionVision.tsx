import { Target, Eye } from 'lucide-react';

export function MissionVision() {
  const cards = [
    {
      icon: <Target size={34} />,
      title: 'Our Mission',
      text: 'To create inspiring office environments through premium furniture solutions that combine functionality, comfort, innovation and timeless aesthetics while delivering exceptional value to every client.',
    },
    {
      icon: <Eye size={34} />,
      title: 'Our Vision',
      text: 'To become India’s most trusted office furniture brand by designing world-class workspaces that empower businesses, enhance productivity and redefine workplace experiences.',
    },
  ];

  return (
    <section
      style={{
        background: '#111',
        padding: '120px 0',
      }}
    >
      <div className="container">
        <div
          style={{
            textAlign: 'center',
            marginBottom: '70px',
          }}
        >
          <div
            style={{
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: 18,
              fontWeight: 600,
            }}
          >
            Purpose & Direction
          </div>

          <h2
            style={{
              color: '#fff',
              fontSize: 'clamp(2.5rem,5vw,4rem)',
              marginBottom: 18,
            }}
          >
            Mission & Vision
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,.65)',
              maxWidth: 700,
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            Every workspace we design is driven by purpose, innovation and a
            commitment to creating environments where businesses thrive.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
            gap: '32px',
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              style={{
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(212,175,55,.15)',
                borderRadius: '24px',
                padding: '48px',
                transition: '.35s',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: '18px',
                  background: 'rgba(212,175,55,.12)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'var(--color-primary)',
                  marginBottom: 28,
                }}
              >
                {card.icon}
              </div>

              <h3
                style={{
                  color: '#fff',
                  fontSize: '1.7rem',
                  marginBottom: 20,
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  color: 'rgba(255,255,255,.7)',
                  lineHeight: 1.9,
                }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}