import { describe, it, expect } from 'vitest';
import { storage } from './storage';
import { isSupabaseConfigured } from '../../lib/supabase';
import schemaSql from '../../../supabase_schema.sql?raw';

describe('Phase 4: Database Schema & Row-Level Security Verification', () => {

  it('verifies all 7 production tables exist in schema', () => {
    expect(schemaSql).toContain('CREATE TABLE IF NOT EXISTS public.products');
    expect(schemaSql).toContain('CREATE TABLE IF NOT EXISTS public.categories');
    expect(schemaSql).toContain('CREATE TABLE IF NOT EXISTS public.leads');
    expect(schemaSql).toContain('CREATE TABLE IF NOT EXISTS public.quote_requests');
    expect(schemaSql).toContain('CREATE TABLE IF NOT EXISTS public.gallery');
    expect(schemaSql).toContain('CREATE TABLE IF NOT EXISTS public.testimonials');
    expect(schemaSql).toContain('CREATE TABLE IF NOT EXISTS public.site_settings');
  });

  it('verifies Row-Level Security (RLS) is explicitly enabled on all tables', () => {
    expect(schemaSql).toContain('ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;');
    expect(schemaSql).toContain('ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;');
    expect(schemaSql).toContain('ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;');
    expect(schemaSql).toContain('ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;');
    expect(schemaSql).toContain('ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;');
    expect(schemaSql).toContain('ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;');
    expect(schemaSql).toContain('ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;');
  });

  it('verifies LEADS RLS policies: public INSERT only, admin-only SELECT/UPDATE/DELETE', () => {
    // Public insert policy
    expect(schemaSql).toContain('CREATE POLICY "Public can submit inquiries"');
    expect(schemaSql).toContain('ON public.leads FOR INSERT');
    expect(schemaSql).toContain('TO anon, authenticated');

    // Admin-only management policy
    expect(schemaSql).toContain('CREATE POLICY "Only admin can view and manage leads"');
    expect(schemaSql).toContain('ON public.leads FOR ALL');
    expect(schemaSql).toContain('TO authenticated');
  });

  it('verifies QUOTE_REQUESTS RLS policies: public INSERT only, admin-only SELECT/UPDATE/DELETE', () => {
    // Public insert policy
    expect(schemaSql).toContain('CREATE POLICY "Public can submit quote requests"');
    expect(schemaSql).toContain('ON public.quote_requests FOR INSERT');
    expect(schemaSql).toContain('TO anon, authenticated');

    // Admin-only management policy
    expect(schemaSql).toContain('CREATE POLICY "Only admin can view and manage quote requests"');
    expect(schemaSql).toContain('ON public.quote_requests FOR ALL');
    expect(schemaSql).toContain('TO authenticated');
  });

  it('verifies admin_users table and is_admin authorization function exist in schema', () => {
    expect(schemaSql).toContain('CREATE TABLE IF NOT EXISTS public.admin_users');
    expect(schemaSql).toContain('CREATE OR REPLACE FUNCTION public.is_admin()');
    expect(schemaSql).toContain('ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;');
    expect(schemaSql).toContain('TRIGGER on_auth_user_created_admin');
  });

  it('verifies PRODUCTS RLS policies: public read active only, admin full CRUD with is_admin()', () => {
    expect(schemaSql).toContain('CREATE POLICY "Public users can view active products"');
    expect(schemaSql).toContain("USING (status = 'active' OR public.is_admin());");
    expect(schemaSql).toContain('CREATE POLICY "Admin full access on products"');
    expect(schemaSql).toContain('USING (public.is_admin())');
  });

  it('verifies SITE_SETTINGS RLS policies: public read, admin update with is_admin()', () => {
    expect(schemaSql).toContain('CREATE POLICY "Public users can view settings"');
    expect(schemaSql).toContain('CREATE POLICY "Admin full access on settings"');
    expect(schemaSql).toContain('USING (public.is_admin())');
  });

  it('verifies automatic updated_at trigger exists for mutated tables', () => {
    expect(schemaSql).toContain('CREATE OR REPLACE FUNCTION public.handle_updated_at()');
    expect(schemaSql).toContain('TRIGGER update_products_updated_at');
    expect(schemaSql).toContain('TRIGGER update_leads_updated_at');
    expect(schemaSql).toContain('TRIGGER update_quote_requests_updated_at');
    expect(schemaSql).toContain('TRIGGER update_site_settings_updated_at');
  });
});

describe('Phase 4: Client Storage & UUID Security', () => {
  it('generates standard RFC4122 v4 UUIDs matching Postgres UUID PK format', () => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    for (let i = 0; i < 20; i++) {
      const id = storage.generateId();
      expect(id).toMatch(uuidRegex);
    }
  });

  it('returns a boolean status from isSupabaseConfigured()', () => {
    // When real credentials exist in .env.local it is true; without it is false
    expect(typeof isSupabaseConfigured()).toBe('boolean');
  });
});
