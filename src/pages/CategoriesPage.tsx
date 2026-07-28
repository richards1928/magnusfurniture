import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../products/services/catalogService';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';

export function CategoriesPage() {
  return (
    <div style={{ background: 'var(--color-warm-white)', minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
      <div style={{
        background: 'var(--color-cream)',
        paddingTop: 'calc(var(--nav-height) + var(--space-12))',
        paddingBottom: 'var(--space-12)',
        marginBottom: 'var(--space-12)',
        borderBottom: '1px solid var(--color-gray-200)'
      }}>
        <div className="container">
          <SectionHeading
            subtitle="Browse"
            title="All Categories"
            description="Explore our complete range of premium furniture by category."
            align="left"
          />
        </div>
      </div>

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--space-6)',
        }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link to={`/categories/${cat.slug}`} style={{ textDecoration: 'none' }}>
                <Card style={{ padding: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
                  <div style={{
                    width: 64, height: 64, minWidth: 64,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-primary-bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem',
                  }}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-dark)', marginBottom: 4 }}>
                      {cat.name}
                    </h3>
                    <div style={{ fontSize: 'var(--fs-small)', color: 'var(--color-gray-500)' }}>
                      {cat.productCount} Products
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
