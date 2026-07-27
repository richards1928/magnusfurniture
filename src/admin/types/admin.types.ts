/* ============================================================
   Admin Dashboard — TypeScript Types
   ============================================================ */

// ── Auth ──
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'editor';
  avatar?: string;
}

export interface AuthToken {
  token: string;
  user: AdminUser;
  expiresAt: number;
}

// ── Products ──
export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  shortDescription: string;
  description: string;
  specifications: Record<string, string>;
  dimensions: { width: string; height: string; depth: string; weight?: string };
  images: string[]; // base64 or URLs
  badge?: string;
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// ── Categories ──
export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  productCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

// ── Gallery ──
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  createdAt: string;
}

// ── Testimonials ──
export interface AdminTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  rating: number;
  avatar?: string;
  featured: boolean;
  status: 'published' | 'pending' | 'hidden';
  createdAt: string;
}

// ── Leads ──
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  source: 'website' | 'whatsapp' | 'phone' | 'referral';
  productInterest?: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// ── Workspace Requests ──
export type WorkspaceRequestStatus = 'pending' | 'in_review' | 'quoted' | 'approved' | 'completed' | 'cancelled';

export interface WorkspaceRequest {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  teamSize: string;
  floorArea?: string;
  requirements: string;
  budget?: string;
  timeline?: string;
  designData?: string; // JSON from the 3D designer
  status: WorkspaceRequestStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// ── Analytics ──
export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalLeads: number;
  newLeads: number;
  totalRequests: number;
  pendingRequests: number;
  totalTestimonials: number;
}

// ── Settings ──
export interface SiteSettings {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  socialLinks: Record<string, string>;
  seoTitle: string;
  seoDescription: string;
}
