export function AboutStory() {
  return (
    <section className="abt-section abt-section--warm abt-story">
      {/* Ambient background glow near story image */}
      <div className="abt-glow abt-glow--gold-bl" style={{ opacity: 0.4 }} />

      <div className="abt-container">
        <div className="abt-story__grid">
          {/* Left — Image wrapper with animations */}
          <div className="abt-story__image-wrap abt-fade-in">
            <div className="abt-story__image-frame" />
            <div className="abt-story__image-container">
              <img
                src="/assets/about/workspace.png"
                alt="Premium Magnus office workspace with executive furniture"
                className="abt-story__image"
                loading="lazy"
              />
            </div>
            <div className="abt-story__image-badge">
              ✦ ARCHITECTURAL GRADE
            </div>
          </div>

          {/* Right — Text */}
          <div className="abt-story__text abt-fade-in abt-delay-2">
            <div className="abt-overline">
              <span className="abt-overline__line" />
              Our Legacy &amp; Vision
            </div>

            <h2 className="abt-heading abt-heading--lg abt-heading--light">
              Designing Better<br />
              Workspaces Since Day One.
            </h2>

            <p className="abt-story__paragraph">
              Magnus Office Furniture specializes in creating premium
              office environments that inspire productivity,
              collaboration and innovation. Our furniture combines
              timeless aesthetics with ergonomic excellence to create
              workspaces that people genuinely enjoy working in.
            </p>

            <p className="abt-story__paragraph">
              From executive cabins and collaborative workstations to
              reception areas and conference rooms, every Magnus
              solution is designed with quality craftsmanship,
              functionality and long-term durability in mind.
            </p>

            <blockquote className="abt-story__quote">
              "We don't just furnish offices — we create environments
              where businesses thrive, teams collaborate, and
              great ideas are born."
            </blockquote>

            <div className="abt-story__signature">
              <div className="abt-story__sig-avatar">M</div>
              <div>
                <div className="abt-story__sig-name">Magnus Office Furniture</div>
                <div className="abt-story__sig-role">
                  Premium Workspace Solutions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}