import { useEffect, useRef, useState } from 'react';

function AnimatedStatValue({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2200;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref}>{count}{suffix}</div>;
}

const stats = [
  {
    value: 116,
    suffix: '+',
    title: 'Premium Products',
    description: 'Complete office furniture catalogue',
  },
  {
    value: 11,
    suffix: '',
    title: 'Product Categories',
    description: 'Solutions for every workspace',
  },
  {
    value: 100,
    suffix: '%',
    title: 'Customized Solutions',
    description: 'Tailored for every business need',
  },
  {
    value: 5,
    suffix: '★',
    title: 'Quality Rating',
    description: 'Built for durability & elegance',
  },
];

export function AboutStats() {
  return (
    <section className="abt-section abt-stats">
      {/* Ambient glow */}
      <div className="abt-glow abt-glow--gold-center" />

      <div className="abt-container">
        {/* Section Header */}
        <div className="abt-section-header abt-fade-in">
          <div className="abt-overline">
            <span className="abt-overline__line" />
            Magnus In Numbers
            <span className="abt-overline__line" />
          </div>

          <h2 className="abt-heading abt-heading--xl abt-heading--dark">
            Trusted Workspace<br />
            Solutions
          </h2>

          <p className="abt-subtitle abt-subtitle--dark">
            Every Magnus project reflects our commitment to craftsmanship,
            functionality and exceptional workplace experiences.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="abt-stats__grid">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className={`abt-stat-card abt-fade-in abt-delay-${index + 1}`}
            >
              <div className="abt-stat-card__value">
                <AnimatedStatValue end={stat.value} suffix={stat.suffix} />
              </div>

              <h3 className="abt-stat-card__title">{stat.title}</h3>

              <p className="abt-stat-card__desc">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}