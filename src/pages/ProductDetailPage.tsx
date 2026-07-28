import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Shield, Truck, Settings } from 'lucide-react';
import { getProductBySlug } from '../products/services/catalogService';
import { Button } from '../components/ui/Button';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug!);

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: 200, paddingBottom: 100, textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Button onClick={() => navigate('/products')} style={{ marginTop: 20 }}>Back to Products</Button>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-white)', paddingBottom: 'var(--space-20)' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--color-cream)', borderBottom: '1px solid var(--color-gray-200)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ padding: 'var(--space-4) var(--side-padding)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--fs-small)' }}>
          <Link to="/products" style={{ color: 'var(--color-gray-500)' }}>Products</Link>
          <span style={{ color: 'var(--color-gray-300)' }}>/</span>
          <Link to={`/categories/${product.categorySlug}`} style={{ color: 'var(--color-gray-500)' }}>{product.category}</Link>
          <span style={{ color: 'var(--color-gray-300)' }}>/</span>
          <span style={{ color: 'var(--color-dark)', fontWeight: 'var(--fw-medium)' }}>{product.name}</span>
        </div>
      </div>

      <div className="container" style={{ marginTop: 'var(--space-12)' }}>
        <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-gray-500)', marginBottom: 'var(--space-6)', textDecoration: 'none', fontSize: 'var(--fs-small)' }}>
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-16)', alignItems: 'start' }}>
          {/* Visuals */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div style={{
              width: '100%', aspectRatio: '1', borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-cream) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--color-gray-200)', marginBottom: 'var(--space-4)',
              position: 'relative',
            }}>
              {product.badge && (
                <span style={{
                  position: 'absolute', top: 16, left: 16,
                  background: 'var(--color-primary)',
                  color: '#fff', fontSize: 'var(--fs-xs)',
                  fontWeight: 'var(--fw-semibold)',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-full)',
                }}>{product.badge}</span>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 'var(--radius-md)',
                  background: 'var(--color-gray-100)', border: '1px solid var(--color-gray-200)',
                  cursor: 'pointer',
                }} />
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ fontSize: 'var(--fs-small)', color: 'var(--color-primary)', fontWeight: 'var(--fw-semibold)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wider)', marginBottom: 'var(--space-2)' }}>
              {product.category}
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h2)', color: 'var(--color-dark)', marginBottom: 'var(--space-4)' }}>
              {product.name}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
              <span style={{ fontSize: 'var(--fs-h1)', fontWeight: 'var(--fw-bold)', color: 'var(--color-dark)' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: 'var(--fs-h4)', color: 'var(--color-gray-400)', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--color-gray-600)', lineHeight: 'var(--lh-relaxed)', marginBottom: 'var(--space-8)' }}>
              {product.description}
            </p>

            <div style={{ padding: 'var(--space-6)', background: 'var(--color-cream)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-8)' }}>
              <h3 style={{ fontSize: 'var(--fs-body-lg)', marginBottom: 'var(--space-4)', color: 'var(--color-dark)' }}>Key Features</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {product.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--color-gray-700)' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--color-primary-bg)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={14} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <Button variant="primary" size="lg" style={{ width: '100%' }}>
                Request Quote
              </Button>
              <Button variant="whatsapp" size="lg" style={{ width: '100%' }} href={`https://wa.me/919090626209?text=I'm interested in the ${product.name}`}>
                Inquire on WhatsApp
              </Button>
            </div>

            {/* Spec grid */}
            <div style={{ marginTop: 'var(--space-10)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', borderTop: '1px solid var(--color-gray-200)', paddingTop: 'var(--space-8)' }}>
              <div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wider)', marginBottom: 4 }}>Dimensions</div>
                <div style={{ color: 'var(--color-dark)', fontWeight: 'var(--fw-medium)' }}>{product.dimensions}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wider)', marginBottom: 4 }}>Material</div>
                <div style={{ color: 'var(--color-dark)', fontWeight: 'var(--fw-medium)' }}>{product.material}</div>
              </div>
            </div>
            
            {/* Service guarantees */}
            <div style={{ display: 'flex', gap: 'var(--space-6)', marginTop: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-small)', color: 'var(--color-gray-600)' }}><Shield size={16} color="var(--color-primary)" /> 3-Year Warranty</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-small)', color: 'var(--color-gray-600)' }}><Truck size={16} color="var(--color-primary)" /> Free Delivery</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-small)', color: 'var(--color-gray-600)' }}><Settings size={16} color="var(--color-primary)" /> Free Assembly</div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
