
import { Card } from '../ui/Card';
import { Link } from 'react-router-dom';
import type { Product } from '../../products/services/catalogService';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none' }} className="product-card-link">
      <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }} className="group">
        {/* Image placeholder */}
        <div style={{
          width: '100%',
          aspectRatio: '4/3',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div 
            className="product-image-bg"
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-cream) 100%)',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          {product.badge && (
            <span style={{
              position: 'absolute', top: 16, left: 16,
              background: 'var(--color-primary)',
              color: '#fff', fontSize: '10px',
              fontWeight: 'var(--fw-bold)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--ls-wider)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}>{product.badge}</span>
          )}
        </div>
        <div style={{ padding: 'var(--space-6)', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: 'var(--fs-xs)',
            color: 'var(--color-gray-500)',
            fontWeight: 'var(--fw-semibold)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--ls-wider)',
            marginBottom: 'var(--space-2)',
          }}>{product.category}</div>
          <h3 style={{
            fontSize: 'var(--fs-body-lg)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--fw-semibold)',
            color: 'var(--color-dark)',
            marginBottom: 'var(--space-3)',
          }}>{product.name}</h3>
          <p style={{
            fontSize: 'var(--fs-small)',
            color: 'var(--color-gray-500)',
            marginBottom: 'var(--space-5)',
            lineHeight: 'var(--lh-relaxed)',
            flex: 1,
          }}>{product.shortDescription}</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {product.originalPrice && (
                <span style={{
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--color-gray-400)',
                  textDecoration: 'line-through',
                }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
              <span style={{
                fontSize: 'var(--fs-h4)',
                fontWeight: 'var(--fw-bold)',
                color: 'var(--color-primary)',
                lineHeight: 1,
              }}>₹{product.price.toLocaleString('en-IN')}</span>
            </div>
            <div className="product-view-btn" style={{
              fontSize: 'var(--fs-xs)',
              fontWeight: 'var(--fw-bold)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--ls-wider)',
              color: 'var(--color-dark)',
              borderBottom: '1px solid var(--color-dark)',
              paddingBottom: 2,
              transition: 'all 0.3s ease',
            }}>
              Discover
            </div>
          </div>
        </div>
      </Card>
      <style>{`
        .product-card-link:hover .product-image-bg {
          transform: scale(1.05);
        }
        .product-card-link:hover .product-view-btn {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
        }
      `}</style>
    </Link>
  );
}
