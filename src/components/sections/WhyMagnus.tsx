import {
  Award,
  ShieldCheck,
  Sofa,
  Wrench,
} from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    description:
      'Every Magnus product is manufactured using carefully selected materials and premium finishes to ensure durability and timeless appeal.',
  },
  {
    icon: Sofa,
    title: 'Customized Solutions',
    description:
      'From executive cabins to collaborative workspaces, every project is tailored to your business requirements and brand identity.',
  },
  {
    icon: Wrench,
    title: 'Professional Installation',
    description:
      'Our experienced installation team ensures a smooth, efficient and hassle-free setup with attention to every detail.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Support',
    description:
      'Our commitment continues after delivery with dependable customer service and long-term after-sales support.',
  },
];

export function WhyMagnus() {
  return (
    <section className="abt-section abt-section--warm abt-why">
      <div className="abt-container">
        {/* Section Header */}
        <div className="abt-section-header abt-fade-in">
          <div className="abt-overline">
            <span className="abt-overline__line" />
            Why Choose Magnus
            <span className="abt-overline__line" />
          </div>

          <h2 className="abt-heading abt-heading--xl abt-heading--light">
            Designed Around<br />
            Your Business
          </h2>

          <p className="abt-subtitle abt-subtitle--light">
            We believe exceptional office furniture is more than aesthetics.
            It is about creating productive environments that inspire people
            and strengthen businesses.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="abt-why__grid">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`abt-card abt-card--light abt-why__card abt-fade-in abt-delay-${index + 1}`}
              >
                <div className="abt-icon-wrap abt-icon-wrap--gold">
                  <Icon size={32} />
                </div>

                <h3 className="abt-why__card-title">{item.title}</h3>

                <p className="abt-why__card-text">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}