import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
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
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
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
  }, [end, duration]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export function AboutHero() {
  return (
    <section className="abt-section abt-section--dark abt-hero">
      {/* Ambient Glows */}
      <div className="abt-glow abt-glow--gold-tr" />
      <div className="abt-glow abt-glow--gold-bl" />

      {/* Decorative vertical lines */}
      <div className="abt-hero__deco">
        <div className="abt-hero__deco-line" />
        <div className="abt-hero__deco-line" />
        <div className="abt-hero__deco-line" />
      </div>

      <div className="abt-container">
        <div className="abt-hero__content">
          {/* Breadcrumb */}
          <nav className="abt-hero__breadcrumb abt-fade-in" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} className="abt-hero__breadcrumb-sep" />
            <span className="abt-hero__breadcrumb-current">About</span>
          </nav>

          {/* Overline */}
          <div className="abt-overline abt-fade-in abt-delay-1">
            <span className="abt-overline__line" />
            About Magnus
            <span className="abt-overline__line" />
          </div>

          {/* Display Heading */}
          <h1 className="abt-heading abt-heading--display abt-heading--dark abt-fade-in abt-delay-2">
            Crafting<br />
            <strong>Inspiring</strong><br />
            <strong>Workspaces.</strong>
          </h1>

          {/* Description */}
          <p className="abt-hero__description abt-fade-in abt-delay-3">
            Magnus Office Furniture creates premium workspace solutions that
            combine world-class design, ergonomic comfort and impeccable
            functionality for modern businesses across India.
          </p>

          {/* CTAs */}
          <div className="abt-btn-group abt-hero__buttons abt-fade-in abt-delay-4">
            <Link to="/products" className="abt-btn abt-btn--primary">
              Explore Products
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="abt-btn abt-btn--outline">
              Contact Us
            </Link>
          </div>

          {/* Statistics Row */}
          <div className="abt-hero__stats abt-fade-in abt-delay-5">
            <div className="abt-hero__stat">
              <div className="abt-hero__stat-value">
                <AnimatedCounter end={116} suffix="+" />
              </div>
              <div className="abt-hero__stat-label">Premium Products</div>
            </div>

            <div className="abt-hero__stat">
              <div className="abt-hero__stat-value">
                <AnimatedCounter end={11} />
              </div>
              <div className="abt-hero__stat-label">Product Categories</div>
            </div>

            <div className="abt-hero__stat">
              <div className="abt-hero__stat-value">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <div className="abt-hero__stat-label">Customized Solutions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}