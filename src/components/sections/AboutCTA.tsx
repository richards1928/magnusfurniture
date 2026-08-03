import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg,#111111 0%,#1A1612 60%,#111111 100%)",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold Glow */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "rgba(212,175,55,.08)",
          filter: "blur(140px)",
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: 900,
          margin: "0 auto",
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
          Let's Build Together
        </div>

        <h2
          style={{
            color: "#fff",
            fontSize: "clamp(2.8rem,6vw,4.8rem)",
            lineHeight: 1.1,
            marginBottom: 28,
          }}
        >
          Ready to Transform
          <br />
          Your Workspace?
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,.72)",
            fontSize: "1.1rem",
            lineHeight: 1.8,
            maxWidth: 700,
            margin: "0 auto 50px",
          }}
        >
          Whether you're setting up a new office or upgrading your existing
          workspace, Magnus Office Furniture is ready to create a premium
          environment tailored to your business.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 34px",
              background: "var(--color-primary)",
              color: "#111",
              borderRadius: 999,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Explore Products
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "16px 34px",
              border: "1px solid rgba(212,175,55,.35)",
              color: "#fff",
              borderRadius: 999,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}