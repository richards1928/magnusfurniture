import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function AboutCTA() {
  return (
    <section className="abt-section abt-cta">
      {/* Ambient glows behind the glass CTA card */}
      <div className="abt-glow abt-glow--gold-tr" />
      <div className="abt-glow abt-glow--gold-bl" />

      <div className="abt-container">
        <div className="abt-cta__card abt-fade-in">
          <div className="abt-cta__inner">
            <div className="abt-overline">
              <span className="abt-overline__line" />
              Let's Build Together
              <span className="abt-overline__line" />
            </div>

            <h2 className="abt-heading abt-heading--dark abt-cta__heading">
              Ready to Transform<br />
              Your Workspace?
            </h2>

            <p className="abt-cta__description">
              Whether you're setting up a new office or upgrading your existing
              workspace, Magnus Office Furniture is ready to create a premium
              environment tailored to your business.
            </p>

            <div className="abt-cta__buttons">
              <Link to="/products" className="abt-btn abt-btn--primary">
                Explore Products
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="abt-btn abt-btn--outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}