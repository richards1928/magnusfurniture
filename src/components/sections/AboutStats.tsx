const stats = [
  {
    value: "116+",
    title: "Premium Products",
    description: "Complete office furniture catalogue",
  },
  {
    value: "11",
    title: "Product Categories",
    description: "Solutions for every workspace",
  },
  {
    value: "100%",
    title: "Customized Solutions",
    description: "Tailored for every business",
  },
  {
    value: "Premium",
    title: "Quality",
    description: "Built for durability & elegance",
  },
];

export function AboutStats() {
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
              fontWeight: 600,
              marginBottom: 18,
            }}
          >
            Magnus In Numbers
          </div>

          <h2
            style={{
              fontSize: "clamp(2.5rem,5vw,4rem)",
              color: "#111",
              marginBottom: 20,
            }}
          >
            Trusted Workspace
            <br />
            Solutions
          </h2>

          <p
            style={{
              maxWidth: 720,
              margin: "0 auto",
              color: "#666",
              lineHeight: 1.8,
            }}
          >
            Every Magnus project reflects our commitment to craftsmanship,
            functionality and exceptional workplace experiences.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 28,
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.title}
              style={{
                background: "#fff",
                borderRadius: 24,
                padding: "42px 30px",
                textAlign: "center",
                border: "1px solid rgba(212,175,55,.12)",
                boxShadow: "0 18px 40px rgba(0,0,0,.05)",
              }}
            >
              <div
                style={{
                  color: "var(--color-primary)",
                  fontSize: "3rem",
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                {stat.value}
              </div>

              <h3
                style={{
                  color: "#111",
                  marginBottom: 12,
                }}
              >
                {stat.title}
              </h3>

              <p
                style={{
                  color: "#666",
                  lineHeight: 1.8,
                }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}