import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

// ── Eager imports: lightweight pages critical for first paint ──
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

// ── Lazy imports: public pages (loaded on navigation) ──
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage').then(m => ({ default: m.CategoriesPage })));
const CustomFurniturePage = lazy(() => import('./pages/CustomFurniturePage').then(m => ({ default: m.CustomFurniturePage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsAndConditionsPage = lazy(() => import('./pages/TermsAndConditionsPage').then(m => ({ default: m.TermsAndConditionsPage })));

// ContentPages barrel — each page lazy-loaded individually
const ServicesPage = lazy(() => import('./pages/ContentPages').then(m => ({ default: m.ServicesPage })));
const GalleryPage = lazy(() => import('./pages/ContentPages').then(m => ({ default: m.GalleryPage })));
const TestimonialsPage = lazy(() => import('./pages/ContentPages').then(m => ({ default: m.TestimonialsPage })));
const FaqPage = lazy(() => import('./pages/ContentPages').then(m => ({ default: m.FaqPage })));
const ContactPage = lazy(() => import('./pages/ContentPages').then(m => ({ default: m.ContactPage })));

// ── Lazy imports: 3D Designer (heaviest chunk — Three.js + R3F + drei) ──
const DesignerPage = lazy(() => import('./pages/DesignerPage').then(m => ({ default: m.DesignerPage })));

// ── Lazy imports: Admin panel (recharts, admin services, etc.) ──
const LoginPage = lazy(() => import('./admin/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const AdminLayout = lazy(() => import('./admin/components/AdminLayout').then(m => ({ default: m.AdminLayout })));
const DashboardPage = lazy(() => import('./admin/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const AdminProductsPage = lazy(() => import('./admin/pages/ProductsPage').then(m => ({ default: m.AdminProductsPage })));
const ProductForm = lazy(() => import('./admin/pages/ProductForm').then(m => ({ default: m.ProductForm })));
const AdminCategoriesPage = lazy(() => import('./admin/pages/CategoriesPage').then(m => ({ default: m.AdminCategoriesPage })));
const LeadsPage = lazy(() => import('./admin/pages/LeadsPage').then(m => ({ default: m.LeadsPage })));
const WorkspaceRequestsPage = lazy(() => import('./admin/pages/WorkspaceRequestsPage').then(m => ({ default: m.WorkspaceRequestsPage })));
const AdminTestimonialsPage = lazy(() => import('./admin/pages/TestimonialsPage').then(m => ({ default: m.AdminTestimonialsPage })));
const AdminGalleryPage = lazy(() => import('./admin/pages/GalleryPage').then(m => ({ default: m.AdminGalleryPage })));
const AnalyticsPage = lazy(() => import('./admin/pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const SettingsPage = lazy(() => import('./admin/pages/SettingsPage').then(m => ({ default: m.SettingsPage })));

// ── Auth provider is lightweight — keep eager for session hydration ──
import { AuthProvider } from './admin/context/AuthContext';

// ── Loading fallback — minimal spinner matching the site theme ──
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          border: '3px solid #e8e0d4',
          borderTopColor: '#8B6914',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// Placeholder component for unimplemented pages
function Placeholder({ title }: { title: string }) {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-dark)',
        }}
      >
        {title}
      </h1>

      <p style={{ color: 'var(--color-gray-500)' }}>
        This page is under construction.
      </p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Main Website Layout */}
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />

            {/* Marketing & Content Pages */}
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route
              path="custom-furniture"
              element={<CustomFurniturePage />}
            />

            {/* Catalog */}
            <Route path="products" element={<ProductsPage />} />
            <Route
              path="products/:slug"
              element={<ProductDetailPage />}
            />
            <Route path="categories" element={<CategoriesPage />} />
            <Route
              path="categories/:slug"
              element={<ProductsPage />}
            />

            {/* Support & Contact */}
            <Route
              path="testimonials"
              element={<TestimonialsPage />}
            />
            <Route path="faq" element={<FaqPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms-and-conditions" element={<TermsAndConditionsPage />} />

            {/* Portals */}
            <Route
              path="portal"
              element={<Placeholder title="Customer Portal" />}
            />

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Full Screen Pages */}
          <Route path="designer" element={<DesignerPage />} />

          {/* Admin */}
          <Route path="/admin/login" element={<LoginPage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route
              path="products"
              element={<AdminProductsPage />}
            />
            <Route
              path="products/:id"
              element={<ProductForm />}
            />
            <Route
              path="categories"
              element={<AdminCategoriesPage />}
            />
            <Route
              path="gallery"
              element={<AdminGalleryPage />}
            />
            <Route
              path="testimonials"
              element={<AdminTestimonialsPage />}
            />
            <Route path="leads" element={<LeadsPage />} />
            <Route
              path="workspace-requests"
              element={<WorkspaceRequestsPage />}
            />
            <Route
              path="analytics"
              element={<AnalyticsPage />}
            />
            <Route
              path="settings"
              element={<SettingsPage />}
            />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;