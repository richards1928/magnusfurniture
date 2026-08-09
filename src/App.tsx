import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CustomFurniturePage } from './pages/CustomFurniturePage';
import { DesignerPage } from './pages/DesignerPage';

import {
  ServicesPage,
  GalleryPage,
  TestimonialsPage,
  FaqPage,
  ContactPage,
} from './pages/ContentPages';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsAndConditionsPage } from './pages/TermsAndConditionsPage';

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

// Admin imports
import { AuthProvider } from './admin/context/AuthContext';
import { AdminLayout } from './admin/components/AdminLayout';
import { LoginPage } from './admin/pages/LoginPage';
import { DashboardPage } from './admin/pages/DashboardPage';
import { AdminProductsPage } from './admin/pages/ProductsPage';
import { ProductForm } from './admin/pages/ProductForm';
import { AdminCategoriesPage } from './admin/pages/CategoriesPage';
import { LeadsPage } from './admin/pages/LeadsPage';
import { WorkspaceRequestsPage } from './admin/pages/WorkspaceRequestsPage';
import { AdminTestimonialsPage } from './admin/pages/TestimonialsPage';
import { AdminGalleryPage } from './admin/pages/GalleryPage';
import { AnalyticsPage } from './admin/pages/AnalyticsPage';
import { SettingsPage } from './admin/pages/SettingsPage';

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;