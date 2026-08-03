export function AboutStory() {
  return (
    <section
      style={{
        background: "#F8F6F2",
        padding: "120px 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              width: "100%",
              height: 520,
              borderRadius: 28,
              background:
                "linear-gradient(135deg,#D4AF37 0%,#B68D2A 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontSize: "2rem",
              fontWeight: 700,
            }}
          >
            Magnus Office
          </div>
        </div>

        {/* Right */}
        <div>
          <div
            style={{
              color: "var(--color-primary)",
              textTransform: "uppercase",
              letterSpacing: "3px",
              marginBottom: 20,
              fontWeight: 600,
            }}
          >
            Our Story
          </div>

          <h2
            style={{
              fontSize: "3rem",
              lineHeight: 1.1,
              marginBottom: 28,
              color: "#111",
            }}
          >
            Designing Better
            <br />
            Workspaces.
          </h2>

          <p
            style={{
              color: "#555",
              lineHeight: 1.9,
              marginBottom: 24,
            }}
          >
            Magnus Office Furniture specializes in creating premium
            office environments that inspire productivity,
            collaboration and innovation. Our furniture combines
            timeless aesthetics with ergonomic excellence to create
            workspaces that people genuinely enjoy working in.
          </p>

          <p
            style={{
              color: "#555",
              lineHeight: 1.9,
            }}
          >
            From executive cabins and collaborative workstations to
            reception areas and conference rooms, every Magnus
            solution is designed with quality craftsmanship,
            functionality and long-term durability in mind.
          </p>
        </div>
      </div>
    </section>
  );
}