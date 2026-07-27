
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, categories, getCategoryBySlug, getProductsByCategory } from '../data/products';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ProductCard } from '../components/product/ProductCard';

export function ProductsPage() {
  const { slug } = useParams<{ slug?: string }>();
  
  const currentCategory = slug ? getCategoryBySlug(slug) : null;
  const displayProducts = currentCategory ? getProductsByCategory(slug!) : products;
  
  const title = currentCategory ? currentCategory.name : 'All Products';
  const description = currentCategory 
    ? currentCategory.description 
    : 'Explore our complete collection of premium, handcrafted furniture.';

  return (
    <div style={{ background: 'var(--color-warm-white)', minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--color-cream)',
        paddingTop: 'calc(var(--nav-height) + var(--space-12))',
        paddingBottom: 'var(--space-12)',
        marginBottom: 'var(--space-12)',
        borderBottom: '1px solid var(--color-gray-200)'
      }}>
        <div className="container">
          <SectionHeading
            subtitle={currentCategory ? 'Category' : 'Collection'}
            title={title}
            description={description}
            align="left"
          />
        </div>
      </div>

      <div className="container" style={{ display: 'flex', gap: 'var(--space-12)', alignItems: 'flex-start' }}>
        {/* Sidebar Filters */}
        <div className="sidebar-filters" style={{ width: 240, flexShrink: 0, position: 'sticky', top: 'calc(var(--nav-height) + var(--space-8))' }}>
          <h3 style={{ fontSize: 'var(--fs-body-lg)', marginBottom: 'var(--space-4)', color: 'var(--color-dark)' }}>Categories</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <li>
              <Link
                to="/products"
                style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: 'var(--space-2) 0',
                  color: !slug ? 'var(--color-primary)' : 'var(--color-gray-700)',
                  fontWeight: !slug ? 'var(--fw-semibold)' : 'var(--fw-regular)',
                  textDecoration: 'none',
                }}
              >
                <span>All Products</span>
                <span style={{ color: 'var(--color-gray-400)', fontSize: 'var(--fs-small)' }}>{products.length}</span>
              </Link>
            </li>
            {categories.map(cat => (
              <li key={cat.id}>
                <Link
                  to={`/categories/${cat.slug}`}
                  style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: 'var(--space-2) 0',
                    color: slug === cat.slug ? 'var(--color-primary)' : 'var(--color-gray-700)',
                    fontWeight: slug === cat.slug ? 'var(--fw-semibold)' : 'var(--fw-regular)',
                    textDecoration: 'none',
                  }}
                >
                  <span>{cat.name}</span>
                  <span style={{ color: 'var(--color-gray-400)', fontSize: 'var(--fs-small)' }}>{cat.productCount}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Grid */}
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 'var(--space-6)',
            paddingBottom: 'var(--space-4)',
            borderBottom: '1px solid var(--color-gray-200)',
          }}>
            <div style={{ color: 'var(--color-gray-500)', fontSize: 'var(--fs-small)' }}>
              Showing {displayProducts.length} products
            </div>
            {/* Mock sort dropdown */}
            <select style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-gray-300)',
              background: 'var(--color-white)',
              fontFamily: 'var(--font-body)',
              color: 'var(--color-dark)',
            }}>
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>

          {displayProducts.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 'var(--space-6)',
            }}>
              {displayProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--color-gray-500)' }}>
              No products found in this category.
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .sidebar-filters { display: none; }
        }
      `}</style>
    </div>
  );
}
