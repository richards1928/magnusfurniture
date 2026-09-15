import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Shield, Truck, Settings, Phone } from 'lucide-react';
import { getProductBySlug } from '../products/services/catalogService';
import { Button } from '../components/ui/Button';

const PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'><rect width='100%' height='100%' fill='%23f8f6f0'/><g transform='translate(200, 220)'><rect width='200' height='140' rx='12' fill='%23e2ded4'/><path d='M30 100 L80 50 L120 80 L170 30 L190 100 Z' fill='%23c5bea8'/><circle cx='60' cy='40' r='16' fill='%23d3ccba'/></g><text x='50%' y='410' font-family='sans-serif' font-size='22' font-weight='600' fill='%23666666' text-anchor='middle'>MAGNUS</text><text x='50%' y='440' font-family='sans-serif' font-size='15' fill='%23999999' text-anchor='middle'>Product Image Coming Soon</text></svg>";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const product = getProductBySlug(slug!);
  const passedImage = (location.state as any)?.image;

  const images = product ? [
    passedImage,
    product.hero,
    product.thumbnail,
    ...(product.images || [])
  ].filter(Boolean) as string[] : (passedImage ? [passedImage] : []);
  
  const uniqueImages = Array.from(new Set(images));
  const [activeImage, setActiveImage] = useState(passedImage || uniqueImages[0] || "");
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const target = passedImage || uniqueImages[0] || "";
    if (target) {
      setActiveImage(target);
      setImgError(false);
    }
  }, [product?.id, slug, passedImage]);


  if (!product) {
    return (
      <div className="container" style={{ paddingTop: 200, paddingBottom: 100, textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Button onClick={() => navigate('/products')} style={{ marginTop: 20 }}>Back to Products</Button>
      </div>
    );
  }

  const currentImgSrc = (imgError || !activeImage) ? PLACEHOLDER_IMAGE : activeImage;
  const displayFeatures = product.features && product.features.length > 0
    ? product.features
    : [
        'Ergonomic & Modern Office Design',
        'Premium Commercial Grade Construction',
        'Integrated Cable & Wire Management',
        'Scratch-Resistant & Easy-to-Clean Finish',
      ];

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

        <div className="product-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-16)', alignItems: 'start' }}>
          {/* Visuals */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div style={{
              width: '100%', aspectRatio: '1', borderRadius: 'var(--radius-lg)',
              background: 'var(--color-walnut-light, #5A2919)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--color-gray-200)', marginBottom: 'var(--space-4)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}>
              <img
                key={currentImgSrc}
                src={currentImgSrc}
                alt={product.name}
                loading="eager"
                onError={() => {
                  if (activeImage !== product.hero && product.hero) {
                    setActiveImage(product.hero);
                  } else {
                    setImgError(true);
                  }
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: imgError || !activeImage ? '20px' : '16px',
                }}
              />
              {product.badge && (
                <span style={{
                  position: 'absolute', top: 16, left: 16,
                  background: 'var(--color-primary)',
                  color: '#fff', fontSize: 'var(--fs-xs)',
                  fontWeight: 'var(--fw-semibold)',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-full)',
                  zIndex: 1,
                }}>{product.badge}</span>
              )}
            </div>
            {uniqueImages.length > 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
                {uniqueImages.map((img, idx) => (
                  <div key={idx} 
                    onClick={() => { setActiveImage(img); setImgError(false); }}
                    style={{
                      aspectRatio: '1', borderRadius: 'var(--radius-md)',
                      background: 'var(--color-walnut-light, #5A2919)', 
                      border: `2px solid ${activeImage === img ? 'var(--color-primary)' : 'var(--color-gray-200)'}`,
                      cursor: 'pointer',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 6,
                      transition: 'all 0.2s ease',
                    }}>
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ fontSize: 'var(--fs-small)', color: 'var(--color-primary)', fontWeight: 'var(--fw-semibold)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wider)', marginBottom: 'var(--space-2)' }}>
              {product.category}
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h2)', color: 'var(--color-dark)', marginBottom: 'var(--space-4)' }}>
              {product.name}
            </h1>
            

            <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--color-gray-600)', lineHeight: 'var(--lh-relaxed)', marginBottom: 'var(--space-8)' }}>
              {product.description || 'High-quality office furniture designed for modern workplaces.'}
            </p>

            <div style={{ padding: 'var(--space-6)', background: 'var(--color-cream)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-8)' }}>
              <h3 style={{ fontSize: 'var(--fs-body-lg)', marginBottom: 'var(--space-4)', color: 'var(--color-dark)' }}>Key Features</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {displayFeatures.map((f, i) => (
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
              <a href="tel:9090626207" style={{ textDecoration: 'none', width: '100%' }}>
                <Button variant="primary" size="lg" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Phone size={16} /> Call Us: 9090 626 207
                </Button>
              </a>
              <Button variant="whatsapp" size="lg" style={{ width: '100%' }} href={`https://wa.me/919090626207?text=I'm interested in the ${product.name}`}>
                Inquire on WhatsApp
              </Button>
            </div>

            {/* Spec grid */}
            <div style={{ marginTop: 'var(--space-10)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', borderTop: '1px solid var(--color-gray-200)', paddingTop: 'var(--space-8)' }}>
              <div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wider)', marginBottom: 4 }}>Dimensions</div>
                <div style={{ color: 'var(--color-dark)', fontWeight: 'var(--fw-medium)' }}>
                  {product.dimensions || 'Standard / Custom Sizes Available'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wider)', marginBottom: 4 }}>Material</div>
                <div style={{ color: 'var(--color-dark)', fontWeight: 'var(--fw-medium)' }}>
                  {product.material || 'Commercial Grade Engineered Wood / Metal'}
                </div>
              </div>
            </div>
            
            {/* Service guarantees */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', marginTop: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-small)', color: 'var(--color-gray-600)' }}><Shield size={16} color="var(--color-primary)" /> 3-Year Warranty</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-small)', color: 'var(--color-gray-600)' }}><Truck size={16} color="var(--color-primary)" /> Free Delivery</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-small)', color: 'var(--color-gray-600)' }}><Settings size={16} color="var(--color-primary)" /> Free Assembly</div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .product-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
