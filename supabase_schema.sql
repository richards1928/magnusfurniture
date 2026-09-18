-- ============================================================================
-- MAGNUS OFFICE FURNITURE — PRODUCTION DATABASE SCHEMA & SECURITY POLICIES
-- Target: Supabase (PostgreSQL 15+)
-- 
-- Run this entire script in your Supabase Project: SQL Editor -> New Query -> Run
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. PRODUCTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  price NUMERIC(12, 2) NOT NULL DEFAULT 0,
  original_price NUMERIC(12, 2),
  short_description TEXT,
  description TEXT,
  specifications JSONB DEFAULT '{}'::jsonb,
  dimensions JSONB DEFAULT '{}'::jsonb,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  badge TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived')),
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing for search & catalog listing
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);

-- ----------------------------------------------------------------------------
-- 2. LEADS TABLE (Customer Inquiries, Consultations & Contact Form Submissions)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'website' CHECK (source IN ('website', 'whatsapp', 'phone', 'referral', 'consultation')),
  product_interest TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- ----------------------------------------------------------------------------
-- 3. QUOTE REQUESTS TABLE (CAD Custom Quotes & 3D Workspace Design Submissions)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  team_size TEXT,
  floor_area TEXT,
  requirements TEXT,
  budget TEXT,
  timeline TEXT,
  design_data JSONB DEFAULT NULL, -- Exported 3D scene payload from designer
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'quoted', 'approved', 'completed', 'cancelled')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON public.quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON public.quote_requests(created_at DESC);

-- ----------------------------------------------------------------------------
-- 4. CATEGORIES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image TEXT,
  product_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 5. TESTIMONIALS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  location TEXT,
  quote TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'pending', 'hidden')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 6. GALLERY ITEMS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Office',
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 7. SITE SETTINGS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  business_name TEXT NOT NULL DEFAULT 'Magnus Office Furniture',
  tagline TEXT NOT NULL DEFAULT 'Premium Office Furniture in Hyderabad',
  phone TEXT NOT NULL DEFAULT '9090626207',
  email TEXT NOT NULL DEFAULT 'magnusofficefurniture@gmail.com',
  whatsapp TEXT NOT NULL DEFAULT '919090626207',
  address TEXT NOT NULL DEFAULT 'M R Elite, 3rd Floor, Opposite Sarath City, Kondapur, Hyderabad 500084',
  seo_title TEXT NOT NULL DEFAULT 'Magnus Office Furniture | Premium Office Furniture in Hyderabad',
  seo_description TEXT NOT NULL DEFAULT 'Premium office furniture solutions for modern workspaces in Hyderabad.',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert initial settings row if not present
INSERT INTO public.site_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 8. ADMIN AUTHORIZATION TABLE & ROLE-BASED ACCESS CONTROL (RBAC)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on email for admin lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- Helper function: Returns true ONLY if the authenticated user is an authorized admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT (
    -- 1. Check if Supabase JWT app_metadata contains admin role
    COALESCE((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin'), false)
    -- 2. OR user exists in public.admin_users
    OR EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid()
    )
  );
$$;

-- Trigger: Automatically registers the first user created in Supabase Auth as super_admin
CREATE OR REPLACE FUNCTION public.handle_admin_user_registration()
RETURNS TRIGGER AS $$
BEGIN
  -- If user has admin role in app_metadata OR if admin_users is empty, register as admin
  IF (NEW.raw_app_meta_data ->> 'role') IN ('admin', 'super_admin')
     OR NOT EXISTS (SELECT 1 FROM public.admin_users) THEN
    INSERT INTO public.admin_users (id, email, role)
    VALUES (NEW.id, NEW.email, 'super_admin')
    ON CONFLICT (id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_admin_user_registration();

-- ----------------------------------------------------------------------------
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------

-- Enable RLS on every table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- ── ADMIN USERS RLS ──
CREATE POLICY "Admins can view admin users list"
  ON public.admin_users FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- ── PRODUCTS RLS ──
-- Public users can only view active products; admins can view all (including drafts)
CREATE POLICY "Public users can view active products"
  ON public.products FOR SELECT
  USING (status = 'active' OR public.is_admin());

-- Only verified administrators can insert, update, or delete products
CREATE POLICY "Admin full access on products"
  ON public.products FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ── CATEGORIES RLS ──
CREATE POLICY "Public users can view active categories"
  ON public.categories FOR SELECT
  USING (status = 'active' OR public.is_admin());

CREATE POLICY "Admin full access on categories"
  ON public.categories FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ── TESTIMONIALS RLS ──
CREATE POLICY "Public users can view published testimonials"
  ON public.testimonials FOR SELECT
  USING (status = 'published' OR public.is_admin());

CREATE POLICY "Admin full access on testimonials"
  ON public.testimonials FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ── GALLERY RLS ──
CREATE POLICY "Public users can view gallery"
  ON public.gallery FOR SELECT
  USING (true);

CREATE POLICY "Admin full access on gallery"
  ON public.gallery FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ── SITE SETTINGS RLS ──
CREATE POLICY "Public users can view settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admin full access on settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ── LEADS RLS (CRITICAL CUSTOMER PRIVACY) ──
-- Anyone can submit a lead / inquiry from website forms
CREATE POLICY "Public can submit inquiries"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ONLY confirmed administrators can view, update, or delete customer leads
CREATE POLICY "Only admin can view and manage leads"
  ON public.leads FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ── QUOTE REQUESTS RLS (CRITICAL CUSTOMER PRIVACY) ──
-- Anyone can submit a CAD or 3D workspace design request
CREATE POLICY "Public can submit quote requests"
  ON public.quote_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ONLY confirmed administrators can view, update, or delete customer quote requests
CREATE POLICY "Only admin can view and manage quote requests"
  ON public.quote_requests FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ----------------------------------------------------------------------------
-- 9. AUTOMATIC TIMESTAMP TRIGGER
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
