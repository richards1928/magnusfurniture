import { Target, Eye } from 'lucide-react';

const cards = [
  {
    icon: <Target size={34} />,
    title: 'Our Mission',
    text: 'To create inspiring office environments through premium furniture solutions that combine functionality, comfort, innovation and timeless aesthetics — delivering exceptional value to every client we partner with.',
  },
  {
    icon: <Eye size={34} />,
    title: 'Our Vision',
    text: 'To become India\'s most trusted office furniture brand by designing world-class workspaces that empower businesses, enhance productivity and fundamentally redefine workplace experiences.',
  },
];

export function MissionVision() {
  return (
    <section className="abt-section abt-mission">
      {/* Ambient glows */}
      <div className="abt-glow abt-glow--gold-center" />

      <div className="abt-container">
        {/* Section Header */}
        <div className="abt-section-header abt-fade-in">
          <div className="abt-overline">
            <span className="abt-overline__line" />
            Purpose &amp; Direction
            <span className="abt-overline__line" />
          </div>

          <h2 className="abt-heading abt-heading--xl abt-heading--dark">
            Mission &amp; Vision
          </h2>

          <p className="abt-subtitle abt-subtitle--dark">
            Every workspace we design is driven by purpose, innovation and a
            commitment to creating environments where businesses thrive.
          </p>
        </div>

        {/* Cards */}
        <div className="abt-mission__cards">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className={`abt-card abt-card--glass abt-mission__card abt-fade-in abt-delay-${index + 2}`}
            >
              <div className="abt-icon-wrap abt-icon-wrap--gold">
                {card.icon}
              </div>

              <h3 className="abt-mission__card-title">{card.title}</h3>

              <p className="abt-mission__card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}