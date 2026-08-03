import {
  MessageCircle,
  PenTool,
  Hammer,
  Truck,
  Wrench,
} from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Consultation",
    description:
      "Understanding your workspace, goals and furniture requirements.",
  },
  {
    icon: PenTool,
    title: "Design",
    description:
      "Planning layouts and selecting furniture that fits your brand and workflow.",
  },
  {
    icon: Hammer,
    title: "Manufacturing",
    description:
      "Precision manufacturing with premium materials and quality craftsmanship.",
  },
  {
    icon: Truck,
    title: "Delivery",
    description:
      "Safe and timely transportation of every furniture solution.",
  },
  {
    icon: Wrench,
    title: "Installation",
    description:
      "Professional installation ensuring every detail is perfectly finished.",
  },
];

export function ProcessTimeline() {
  return (
    <section
      style={{
        background: "#111",
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
              marginBottom: 16,
            }}
          >
            Our Process
          </div>

          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(2.5rem,5vw,4rem)",
              marginBottom: 18,
            }}
          >
            From Concept
            <br />
            To Completion
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,.65)",
              maxWidth: 700,
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            Every Magnus project follows a structured process that ensures
            exceptional quality, timely delivery and complete client
            satisfaction.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 30,
          }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                style={{
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(212,175,55,.15)",
                  borderRadius: 24,
                  padding: 36,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    background: "rgba(212,175,55,.12)",
                    color: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <Icon size={34} />
                </div>

                <div
                  style={{
                    color: "var(--color-primary)",
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  Step {index + 1}
                </div>

                <h3
                  style={{
                    color: "#fff",
                    marginBottom: 18,
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    color: "rgba(255,255,255,.65)",
                    lineHeight: 1.8,
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}