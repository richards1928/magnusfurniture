import {
  Award,
  ShieldCheck,
  Sofa,
  Wrench,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Every Magnus product is manufactured using carefully selected materials and premium finishes to ensure durability and timeless appeal.",
  },
  {
    icon: Sofa,
    title: "Customized Solutions",
    description:
      "From executive cabins to collaborative workspaces, every project is tailored to your business requirements and brand identity.",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description:
      "Our experienced installation team ensures a smooth, efficient and hassle-free setup with attention to every detail.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Support",
    description:
      "Our commitment continues after delivery with dependable customer service and long-term after-sales support.",
  },
];

export function WhyMagnus() {
  return (
    <section
      style={{
        background: "#F8F6F2",
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
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: 18,
              fontWeight: 600,
            }}
          >
            Why Choose Magnus
          </div>

          <h2
            style={{
              fontSize: "clamp(2.5rem,5vw,4rem)",
              color: "#111",
              marginBottom: 20,
            }}
          >
            Designed Around
            <br />
            Your Business
          </h2>

          <p
            style={{
              maxWidth: 700,
              margin: "0 auto",
              color: "#666",
              lineHeight: 1.8,
            }}
          >
            We believe exceptional office furniture is more than aesthetics.
            It is about creating productive environments that inspire people
            and strengthen businesses.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 30,
          }}
        >
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                style={{
                  background: "#fff",
                  padding: 40,
                  borderRadius: 24,
                  border: "1px solid rgba(212,175,55,.12)",
                  transition: ".35s",
                  boxShadow: "0 20px 50px rgba(0,0,0,.05)",
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 18,
                    background: "rgba(212,175,55,.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-primary)",
                    marginBottom: 28,
                  }}
                >
                  <Icon size={34} />
                </div>

                <h3
                  style={{
                    marginBottom: 18,
                    color: "#111",
                    fontSize: "1.4rem",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#666",
                    lineHeight: 1.8,
                  }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}