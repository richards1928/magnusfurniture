
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, categories, getCategoryBySlug, getProductsByCategory } from '../products/services/catalogService';
import { ProductCard } from '../components/product/ProductCard';
import { ChevronRight } from 'lucide-react';
import '../styles/ProductsPage.css';

export function ProductsPage() {
  const { slug } = useParams<{ slug?: string }>();
  
  const currentCategory = slug ? getCategoryBySlug(slug) : null;
  const displayProducts = currentCategory ? getProductsByCategory(slug!) : products;
  
  const description = currentCategory 
    ? currentCategory.description 
    : 'Explore our complete collection of premium, handcrafted furniture.';

  return (
    <div style={{ background: '#0C0A09', minHeight: '100vh' }}>
      {/* ── Premium Hero Banner ── */}
      <div className="products-hero">
        <div className="products-hero__inner container">
          {/* Breadcrumb */}
          <motion.nav
            className="products-breadcrumb"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            aria-label="Breadcrumb"
          >
            <Link to="/">Home</Link>
            <ChevronRight size={10} className="products-breadcrumb__separator" />
            {currentCategory ? (
              <>
                <Link to="/products">Products</Link>
                <ChevronRight size={10} className="products-breadcrumb__separator" />
                <span className="products-breadcrumb__current">{currentCategory.name}</span>
              </>
            ) : (
              <span className="products-breadcrumb__current">Products</span>
            )}
          </motion.nav>

          {/* Overline */}
          <motion.div
            className="products-hero__overline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="products-hero__overline-bar" />
            Magnus Office Furniture
            <span className="products-hero__overline-bar" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="products-hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Office Furniture{' '}
            <strong>Collection</strong>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="products-hero__subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="products-layout container">
        {/* Filter Panel */}
        <div className="products-filter-panel">
          <div className="products-filter-panel__header">
            <div className="products-filter-panel__accent-bar" />
            <span className="products-filter-panel__title">Filter by Category</span>
          </div>
          <ul className="products-filter-list">
            <li>
              <Link
                to="/products"
                className={`products-filter-item${!slug ? ' products-filter-item--active' : ''}`}
              >
                <span>All Products</span>
                <span className="products-filter-item__count">{products.length}</span>
              </Link>
            </li>
            {categories.map(cat => (
              <li key={cat.id}>
                <Link
                  to={`/categories/${cat.slug}`}
                  className={`products-filter-item${slug === cat.slug ? ' products-filter-item--active' : ''}`}
                >
                  <span>{cat.name}</span>
                  <span className="products-filter-item__count">{cat.productCount}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Sort Bar */}
          <div className="products-sort-bar">
            <div className="products-sort-bar__count">
              Showing <strong>{displayProducts.length}</strong> {displayProducts.length === 1 ? 'product' : 'products'}
              {currentCategory && <> in <strong>{currentCategory.name}</strong></>}
            </div>
            <select className="products-sort-select">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>

          {displayProducts.length > 0 ? (
            <div className="products-grid">
              {displayProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="products-empty">
              <div className="products-empty__icon">📦</div>
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
