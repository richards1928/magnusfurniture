import { motion } from 'framer-motion';
import { products } from '../../products/services/catalogService';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section style={{ background: 'var(--color-warm-white)', padding: 'var(--space-24) 0' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            marginBottom: 64, flexWrap: 'wrap', gap: 24,
          }}
        >
          <div>
            <div style={{
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--color-accent)',
              marginBottom: 16,
            }}>Featured</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300, color: 'var(--color-dark)',
            }}>
              Popular <span style={{ fontWeight: 600 }}>Collections</span>
            </h2>
          </div>
          <Link to="/products" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--color-dark)',
            textDecoration: 'none', borderBottom: '1px solid var(--color-dark)',
            paddingBottom: 4, transition: 'all 0.3s ease',
          }}>
            View All <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Products grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--space-8)',
        }}>
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
