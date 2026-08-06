
import { Link } from 'react-router-dom';
import { Eye, FileText } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../../products/services/catalogService';
import { MagnusMonogram } from '../ui/MagnusLogo';

export function ProductCard({ product }: { product: Product }) {
  const [loaded, setLoaded] = useState(false);

  // Determine a category icon based on the category name
  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      'MD Tables': '🖥️',
      'Manager Tables': '🖥️',
      'Workstations': '💻',
      'Conference Tables': '🤝',
      'Reception Tables': '🏢',
      'Storages and Pedestals': '🗄️',
      'Discussion Tables': '🤝',
      'Executive Chairs': '💺',
      'Visitor Chairs': '🪑',
      'Cafeteria Furniture': '☕',
      'High Counter Tables': '🖥️',
    };
    return icons[category] || '📦';
  };

  // Determine image source based on fallback rules
  const imgSrc = product.hero || product.thumbnail || "";

  return (
    <Link to={`/products/${product.slug}`} className="premium-product-card">
      {/* Image Area */}
      <div className="premium-product-card__image-wrap">
        <div className={`premium-product-card__image-bg${imgSrc && !loaded ? ' is-loading' : ''}`}>
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={product.name}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '10px',
                background: '#ffffff',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.6s ease-in-out',
              }}
            />
          ) : (
            <span className="premium-product-card__image-icon">
              {getCategoryIcon(product.category)}
            </span>
          )}
        </div>

        {/* Category Badge */}
        <span className="premium-product-card__badge">
          {product.category}
        </span>

        {/* Product Badge (e.g. New, Bestseller) */}
        {product.badge && (
          <span className="premium-product-card__product-badge">
            {product.badge}
          </span>
        )}

        {/* Subtle Magnus brand mark – bottom right of image area */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 8,
            left: 10,
            opacity: 0.18,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <MagnusMonogram size={24} color="gold" />
        </div>

        {/* Quick View Overlay */}
        <div className="premium-product-card__overlay">
          <span className="premium-product-card__quick-view">
            <Eye size={13} />
            Quick View
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="premium-product-card__body">
        <div className="premium-product-card__category">
          {product.category}
        </div>
        <h3 className="premium-product-card__name">
          {product.name}
        </h3>
        <div className="premium-product-card__sku">
          SKU: {product.id}
        </div>
        <p className="premium-product-card__desc">
          {product.shortDescription}
        </p>

        {/* Footer */}
        <div className="premium-product-card__footer">
          <div className="premium-product-card__price-group">
            {product.originalPrice && (
              <span className="premium-product-card__original-price">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="premium-product-card__price">
              {product.price > 0
                ? `₹${product.price.toLocaleString('en-IN')}`
                : 'Request Quote'}
            </span>
          </div>
          <span className="premium-product-card__quote-btn">
            <FileText size={12} />
            Details
          </span>
        </div>
      </div>
    </Link>
  );
}
