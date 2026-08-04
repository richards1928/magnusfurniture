import {
  MessageCircle,
  ClipboardList,
  PenTool,
  Hammer,
  Truck,
  Wrench,
} from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    title: 'Consultation',
    description: 'Understanding your workspace goals and requirements.',
  },
  {
    icon: ClipboardList,
    title: 'Planning',
    description: 'Detailed space planning and furniture selection.',
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'Custom layouts aligned with your brand identity.',
  },
  {
    icon: Hammer,
    title: 'Manufacturing',
    description: 'Precision crafting with premium materials.',
  },
  {
    icon: Truck,
    title: 'Delivery',
    description: 'Safe and timely logistics to your location.',
  },
  {
    icon: Wrench,
    title: 'Installation',
    description: 'Professional setup with meticulous attention.',
  },
];

export function ProcessTimeline() {
  return (
    <section className="abt-section abt-section--warm abt-process">
      <div className="abt-container">
        {/* Section Header */}
        <div className="abt-section-header abt-fade-in">
          <div className="abt-overline">
            <span className="abt-overline__line" />
            Our Process
            <span className="abt-overline__line" />
          </div>

          <h2 className="abt-heading abt-heading--xl abt-heading--light">
            From Concept<br />
            To Completion
          </h2>

          <p className="abt-subtitle abt-subtitle--light">
            Every Magnus project follows a structured process that ensures
            exceptional quality, timely delivery and complete client satisfaction.
          </p>
        </div>

        {/* Timeline */}
        <div className="abt-timeline">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className={`abt-timeline__step abt-fade-in abt-delay-${index + 1}`}
              >
                <div className="abt-timeline__step-number">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div>
                  <div className="abt-timeline__step-icon">
                    <Icon size={28} />
                  </div>

                  <h3 className="abt-timeline__step-title">{step.title}</h3>

                  <p className="abt-timeline__step-desc">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}