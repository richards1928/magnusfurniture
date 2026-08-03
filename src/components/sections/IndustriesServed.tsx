import {
  Building2,
  Laptop,
  GraduationCap,
  Hospital,
  Landmark,
  Briefcase,
  Store,
  Users,
} from "lucide-react";

const industries = [
  { icon: Building2, title: "Corporate Offices" },
  { icon: Laptop, title: "IT Companies" },
  { icon: Briefcase, title: "Startups" },
  { icon: GraduationCap, title: "Educational Institutions" },
  { icon: Hospital, title: "Healthcare" },
  { icon: Landmark, title: "Government Offices" },
  { icon: Users, title: "Co-working Spaces" },
  { icon: Store, title: "Retail & Commercial" },
];

export function IndustriesServed() {
  return (
    <section
      style={{
        background: "#fff",
        padding: "120px 0",
      }}
    >
      <div className="container">
        <div
          style={{
            textAlign: "center",
            marginBottom: 70,
          }}
        >
          <div
            style={{
              color: "var(--color-primary)",
              textTransform: "uppercase",
              letterSpacing: "3px",
              fontWeight: 600,
              marginBottom: 18,
            }}
          >
            Industries We Serve
          </div>

          <h2
            style={{
              fontSize: "clamp(2.5rem,5vw,4rem)",
              color: "#111",
              marginBottom: 20,
            }}
          >
            Workspace Solutions
            <br />
            Across Every Industry
          </h2>

          <p
            style={{
              color: "#666",
              maxWidth: 720,
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            Every industry has unique workspace requirements. Magnus delivers
            furniture solutions tailored to productivity, collaboration and
            long-term performance.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 24,
          }}
        >
          {industries.map((industry) => {
            const Icon = industry.icon;

            return (
              <div
                key={industry.title}
                style={{
                  padding: "36px 24px",
                  borderRadius: 22,
                  border: "1px solid rgba(212,175,55,.15)",
                  textAlign: "center",
                  transition: ".35s",
                  background: "#fff",
                  boxShadow: "0 12px 40px rgba(0,0,0,.04)",
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    margin: "0 auto 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(212,175,55,.12)",
                    color: "var(--color-primary)",
                  }}
                >
                  <Icon size={34} />
                </div>

                <h3
                  style={{
                    fontSize: "1.15rem",
                    color: "#111",
                  }}
                >
                  {industry.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}