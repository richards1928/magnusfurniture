import { motion, AnimatePresence } from 'framer-motion';
import { useCatalog, type Product, type Category } from '../../products/services/catalogService';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { ProductCard } from '../product/ProductCard';
import '../../styles/ProductsPage.css';

// ── Category tabs derived from real data ──────────────────────────────────────
const ALL = 'All';
function buildTabs(prods: Product[], allCategories?: Category[]) {
  const counts: Record<string, number> = {};
  prods.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
  if (allCategories) {
    allCategories.forEach(c => {
      if (counts[c.name] === undefined) {
        counts[c.name] = c.productCount || 0;
      }
    });
  }
  const cats = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name]) => name);
  return [ALL, ...cats];
}

export function FeaturedProducts() {
  const { products: allProducts, categories: allCategories } = useCatalog();
  const tabs = useMemo(() => buildTabs(allProducts, allCategories), [allProducts, allCategories]);
  const [activeTab, setActiveTab] = useState(ALL);

  const filtered = useMemo(() => {
    const base = activeTab === ALL ? allProducts : allProducts.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());
    return base.slice(0, 8);
  }, [activeTab, allProducts]);

  return (
    <section style={{
      background: '#420D09',
      padding: '120px 0 140px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Ambient background glows ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-5%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
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
          <div
            className="featured-tabs-container"
            style={{
              marginTop: 48,
              display: 'flex', gap: 10, flexWrap: 'wrap',
            }}
          >
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '9px 22px',
                  borderRadius: 100,
                  border: activeTab === tab
                    ? '1px solid #D4AF37'
                    : '1px solid rgba(212,175,55,0.18)',
                  background: activeTab === tab
                    ? '#D4AF37'
                    : 'rgba(90, 41, 25, 0.4)',
                  color: activeTab === tab ? 'var(--color-walnut-dark, #32140D)' : '#C8BDB3',
                  fontSize: '0.8rem', fontWeight: 600,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (activeTab !== tab) {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.4)';
                    (e.currentTarget as HTMLElement).style.color = '#F5F1E8';
                  }
                }}
                onMouseLeave={e => {
                  if (activeTab !== tab) {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.18)';
                    (e.currentTarget as HTMLElement).style.color = '#C8BDB3';
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
            className="featured-products-grid"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 24,
              justifyContent: 'center',
            }}
          >
            {filtered.length === 0 ? (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '60px 20px',
                color: 'rgba(255,255,255,0.7)',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 20,
                border: '1px dashed rgba(212,175,55,0.25)',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📦</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#F5F1E8', margin: '0 0 8px' }}>
                  No products in {activeTab} yet
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                  New items for this collection are arriving soon. Explore our other collections or check back shortly!
                </p>
              </div>
            ) : (
              filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: '100%', maxWidth: 440, margin: '0 auto' }}
                >
                  <ProductCard product={product} />
                </motion.div>
              )))}
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
