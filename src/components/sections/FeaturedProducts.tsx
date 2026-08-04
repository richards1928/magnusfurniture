import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../../products/services/catalogService';
import { ArrowRight, ArrowUpRight, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';

// ── Category tabs derived from real data ──────────────────────────────────────
const ALL = 'All';
function buildTabs(prods: typeof products) {
  const counts: Record<string, number> = {};
  prods.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
  const cats = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name]) => name);
  return [ALL, ...cats];
}

// ── Badge colours ─────────────────────────────────────────────────────────────
const badgeColour: Record<string, string> = {
  Bestseller: '#D4AF37',
  Premium:    '#C084FC',
  New:        '#34D399',
  Popular:    '#60A5FA',
  Sale:       '#F87171',
};

// ── Fallback icon when no image ───────────────────────────────────────────────
const catIcon: Record<string, string> = {
  'MD Tables':              '🖥️',
  'Manager Tables':         '🖥️',
  'Workstations':           '💻',
  'Conference Tables':      '🤝',
  'Reception Tables':       '🏢',
  'Storages and Pedestals': '🗄️',
  'Discussion Tables':      '💬',
  'Executive Chairs':       '💺',
  'Visitor Chairs':         '🪑',
  'Cafeteria Furniture':    '☕',
  'High Counter Tables':    '📐',
};

export function FeaturedProducts() {
  const tabs = useMemo(() => buildTabs(products), []);
  const [activeTab, setActiveTab] = useState(ALL);
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const base = activeTab === ALL ? products : products.filter(p => p.category === activeTab);
    return base.slice(0, 8);
  }, [activeTab]);

  return (
    <section style={{
      background: '#0F0D0B',
      padding: '120px 0 140px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Ambient background glows ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-5%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(192,132,252,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)' }}>

        {/* ── Section Header ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 64 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 32 }}>
            <div>
              {/* Overline */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'rgba(212,175,55,0.88)',
                marginBottom: 20,
              }}>
                <Sparkles size={12} />
                Our Collections
              </div>

              {/* Heading */}
              <h2 style={{
                fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
                fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                fontWeight: 300, color: '#FFFFFF',
                lineHeight: 1.1, letterSpacing: '-0.02em',
              }}>
                Popular{' '}
                <span style={{ fontWeight: 700 }}>Collections</span>
              </h2>

              {/* Subtitle */}
              <p style={{
                marginTop: 16,
                fontSize: '1rem', color: 'rgba(255,255,255,0.42)',
                lineHeight: 1.7, maxWidth: 480,
              }}>
                Handpicked from our flagship range — designed for modern professionals who demand excellence.
              </p>
            </div>

            {/* View All CTA */}
            <Link to="/products" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <motion.span
                whileHover={{ x: 4 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '13px 28px',
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: 100,
                  fontSize: '0.82rem', fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.75)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.5)';
                  (e.currentTarget as HTMLElement).style.color = '#D4AF37';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
                }}
              >
                View All <ArrowRight size={14} />
              </motion.span>
            </Link>
          </div>

          {/* ── Category Filter Tabs ───────────────────────────────────── */}
          <div style={{
            marginTop: 48,
            display: 'flex', gap: 10, flexWrap: 'wrap',
          }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '9px 22px',
                  borderRadius: 100,
                  border: activeTab === tab
                    ? '1px solid rgba(212,175,55,0.7)'
                    : '1px solid rgba(255,255,255,0.1)',
                  background: activeTab === tab
                    ? 'rgba(212,175,55,0.12)'
                    : 'rgba(255,255,255,0.03)',
                  color: activeTab === tab ? '#D4AF37' : 'rgba(255,255,255,0.48)',
                  fontSize: '0.8rem', fontWeight: 600,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (activeTab !== tab) {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
                  }
                }}
                onMouseLeave={e => {
                  if (activeTab !== tab) {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.48)';
                  }
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Products Grid ─────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 24,
            }}
          >
            {filtered.map((product, i) => {
              const imgSrc = product.hero || product.thumbnail || '';
              const isHovered = hovered === product.id;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHovered(product.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Link
                    to={`/products/${product.slug}`}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div style={{
                      borderRadius: 20,
                      overflow: 'hidden',
                      background: '#18160f',
                      border: isHovered
                        ? '1px solid rgba(212,175,55,0.3)'
                        : '1px solid rgba(255,255,255,0.06)',
                      transition: 'border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease',
                      transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                      boxShadow: isHovered
                        ? '0 24px 60px rgba(0,0,0,0.55), 0 0 0 0 transparent'
                        : '0 4px 20px rgba(0,0,0,0.3)',
                    }}>

                      {/* ── Image Area ───────────────────────────────── */}
                      <div style={{
                        position: 'relative',
                        height: 240,
                        background: '#1a1710',
                        overflow: 'hidden',
                      }}>
                        {imgSrc ? (
                          <img
                            src={imgSrc}
                            alt={product.name}
                            loading="lazy"
                            style={{
                              width: '100%', height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '100%', height: '100%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 64, opacity: 0.25,
                          }}>
                            {catIcon[product.category] || '📦'}
                          </div>
                        )}

                        {/* Dark gradient over image */}
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(to top, rgba(24,22,15,0.85) 0%, rgba(24,22,15,0.1) 55%, transparent 100%)',
                          transition: 'opacity 0.35s ease',
                          opacity: isHovered ? 0.9 : 0.6,
                        }} />

                        {/* Badge row */}
                        <div style={{
                          position: 'absolute', top: 14, left: 14, right: 14,
                          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                        }}>
                          {/* Category chip */}
                          <span style={{
                            padding: '4px 12px',
                            background: 'rgba(0,0,0,0.55)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 100,
                            fontSize: '10px', fontWeight: 600,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.65)',
                          }}>
                            {product.category}
                          </span>

                          {/* Product badge */}
                          {product.badge && (
                            <span style={{
                              padding: '4px 12px',
                              background: badgeColour[product.badge] || '#D4AF37',
                              borderRadius: 100,
                              fontSize: '10px', fontWeight: 700,
                              letterSpacing: '0.08em', textTransform: 'uppercase',
                              color: '#0C0A09',
                            }}>
                              {product.badge}
                            </span>
                          )}
                        </div>

                        {/* Hover: Quick View pill */}
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
                          transition={{ duration: 0.25 }}
                          style={{
                            position: 'absolute', bottom: 14, left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '8px 18px',
                            background: 'rgba(212,175,55,0.92)',
                            borderRadius: 100,
                            fontSize: '11px', fontWeight: 700,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: '#0C0A09',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <ArrowUpRight size={12} />
                          View Details
                        </motion.div>
                      </div>

                      {/* ── Card Body ─────────────────────────────────── */}
                      <div style={{ padding: '20px 22px 22px' }}>

                        {/* Star rating row */}
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          marginBottom: 10,
                        }}>
                          <div style={{ display: 'flex', gap: 2 }}>
                            {[...Array(5)].map((_, si) => (
                              <Star key={si} size={11}
                                fill={si < 4 ? 'rgba(212,175,55,0.9)' : 'rgba(212,175,55,0.3)'}
                                color={si < 4 ? 'rgba(212,175,55,0.9)' : 'rgba(212,175,55,0.3)'}
                              />
                            ))}
                          </div>
                          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                            4.8
                          </span>
                        </div>

                        {/* Product name */}
                        <h3 style={{
                          fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
                          fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
                          fontWeight: 600, color: '#FFFFFF',
                          lineHeight: 1.35, marginBottom: 8,
                          transition: 'color 0.25s ease',
                          ...(isHovered ? { color: '#EDD98A' } : {}),
                        }}>
                          {product.name}
                        </h3>

                        {/* Short description */}
                        <p style={{
                          fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)',
                          lineHeight: 1.65, marginBottom: 18,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                          {product.shortDescription || product.description?.slice(0, 90) + '…'}
                        </p>

                        {/* Features pills */}
                        {product.features?.length > 0 && (
                          <div style={{
                            display: 'flex', gap: 6, flexWrap: 'wrap',
                            marginBottom: 18,
                          }}>
                            {product.features.slice(0, 2).map((f, fi) => (
                              <span key={fi} style={{
                                padding: '3px 10px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 100,
                                fontSize: '10px', color: 'rgba(255,255,255,0.45)',
                                letterSpacing: '0.04em',
                              }}>
                                {f}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Divider */}
                        <div style={{
                          height: 1,
                          background: 'rgba(255,255,255,0.06)',
                          marginBottom: 16,
                        }} />

                        {/* Footer: price + CTA */}
                        <div style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                          <div>
                            {product.originalPrice && (
                              <div style={{
                                fontSize: '11px',
                                color: 'rgba(255,255,255,0.28)',
                                textDecoration: 'line-through',
                                marginBottom: 2,
                              }}>
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </div>
                            )}
                            <div style={{
                              fontSize: product.price > 0 ? '1.05rem' : '0.85rem',
                              fontWeight: 700,
                              color: product.price > 0 ? '#D4AF37' : 'rgba(255,255,255,0.55)',
                              letterSpacing: product.price > 0 ? '-0.01em' : '0.02em',
                            }}>
                              {product.price > 0
                                ? `₹${product.price.toLocaleString('en-IN')}`
                                : 'Request a Quote'}
                            </div>
                          </div>

                          <motion.span
                            animate={{ x: isHovered ? 3 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              fontSize: '11px', fontWeight: 700,
                              letterSpacing: '0.1em', textTransform: 'uppercase',
                              color: isHovered ? '#D4AF37' : 'rgba(255,255,255,0.35)',
                              transition: 'color 0.25s ease',
                            }}
                          >
                            Details <ArrowRight size={12} />
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA strip ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            marginTop: 80,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
            textAlign: 'center',
          }}
        >
          <p style={{
            fontSize: '1rem', color: 'rgba(255,255,255,0.38)',
            maxWidth: 440, lineHeight: 1.7,
          }}>
            Can't find what you're looking for? We custom-build furniture to your exact specifications.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <motion.span
                whileHover={{ scale: 1.03, y: -2 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, #D4AF37 0%, #EDD98A 50%, #D4AF37 100%)',
                  backgroundSize: '200% 100%',
                  borderRadius: 100,
                  fontSize: '0.85rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: '#0C0A09', cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(212,175,55,0.25)',
                }}
              >
                Browse All Products <ArrowRight size={14} />
              </motion.span>
            </Link>
            <Link to="/custom-furniture" style={{ textDecoration: 'none' }}>
              <motion.span
                whileHover={{ scale: 1.03, y: -2 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 32px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: 100,
                  fontSize: '0.85rem', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.65)', cursor: 'pointer',
                }}
              >
                Custom Order
              </motion.span>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
