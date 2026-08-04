import {
  Building2,
  Laptop,
  GraduationCap,
  Hospital,
  Landmark,
  Briefcase,
  Store,
  Users,
} from 'lucide-react';

const industries = [
  { icon: Building2, title: 'Corporate Offices' },
  { icon: Laptop, title: 'IT Companies' },
  { icon: Hospital, title: 'Healthcare' },
  { icon: GraduationCap, title: 'Education' },
  { icon: Landmark, title: 'Government' },
  { icon: Briefcase, title: 'Hospitality' },
  { icon: Users, title: 'Co-working' },
  { icon: Store, title: 'Retail & Commercial' },
];

export function IndustriesServed() {
  return (
    <section className="abt-section abt-industries">
      {/* Ambient glow */}
      <div className="abt-glow abt-glow--gold-center" />

      <div className="abt-container">
        {/* Section Header */}
        <div className="abt-section-header abt-fade-in">
          <div className="abt-overline">
            <span className="abt-overline__line" />
            Industries We Serve
            <span className="abt-overline__line" />
          </div>

          <h2 className="abt-heading abt-heading--xl abt-heading--dark">
            Workspace Solutions<br />
            Across Every Industry
          </h2>

          <p className="abt-subtitle abt-subtitle--dark">
            Every industry has unique workspace requirements. Magnus delivers
            furniture solutions tailored to productivity, collaboration and
            long-term performance.
          </p>
        </div>

        {/* Industry Grid */}
        <div className="abt-industries__grid">
          {industries.map((industry, index) => {
            const Icon = industry.icon;

            return (
              <div
                key={industry.title}
                className={`abt-industry-card abt-fade-in abt-delay-${index + 1}`}
              >
                <div className="abt-industry-card__icon">
                  <Icon size={30} />
                </div>

                <h3 className="abt-industry-card__title">{industry.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}