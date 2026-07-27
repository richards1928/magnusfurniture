import { useEffect, useState } from 'react';
import { StatCard } from '../components/StatCard';
import { Package, Users, Wand2, MessageSquareQuote, TrendingUp, FolderOpen } from 'lucide-react';
import { productsService } from '../services/products.service';
import { leadsService } from '../services/leads.service';
import { workspaceService } from '../services/workspace.service';
import { testimonialsService } from '../services/testimonials.service';
import { categoriesService } from '../services/categories.service';
import { galleryService } from '../services/gallery.service';

export function DashboardPage() {
  const [stats, setStats] = useState({
    products: 0, leads: 0, requests: 0,
    testimonials: 0, categories: 0, gallery: 0,
  });

  useEffect(() => {
    Promise.all([
      productsService.getAll(),
      leadsService.getAll(),
      workspaceService.getAll(),
      testimonialsService.getAll(),
      categoriesService.getAll(),
      galleryService.getAll(),
    ]).then(([p, l, w, t, c, g]) => {
      setStats({
        products: p.length, leads: l.length, requests: w.length,
        testimonials: t.length, categories: c.length, gallery: g.length,
      });
    });
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Welcome back. Here is your business overview.</p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 20, marginBottom: 40,
      }}>
        <StatCard title="Products" value={stats.products} icon={<Package size={18} />} subtitle="Total items" />
        <StatCard title="Leads" value={stats.leads} icon={<Users size={18} />} subtitle="Customer inquiries" />
        <StatCard title="Workspace Requests" value={stats.requests} icon={<Wand2 size={18} />} subtitle="Design submissions" />
        <StatCard title="Testimonials" value={stats.testimonials} icon={<MessageSquareQuote size={18} />} subtitle="Client reviews" />
        <StatCard title="Categories" value={stats.categories} icon={<FolderOpen size={18} />} subtitle="Product categories" />
        <StatCard title="Gallery Items" value={stats.gallery} icon={<TrendingUp size={18} />} subtitle="Portfolio images" />
      </div>

      {/* Quick actions */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: '#1A1A1A', marginBottom: 16 }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'Add Product', href: '/admin/products/new' },
            { label: 'View Leads', href: '/admin/leads' },
            { label: 'Add Testimonial', href: '/admin/testimonials' },
            { label: 'Upload to Gallery', href: '/admin/gallery' },
          ].map(action => (
            <a key={action.label} href={action.href} style={{
              padding: '10px 20px', borderRadius: 10,
              border: '1px solid #E5E5E5', background: '#fff',
              fontSize: 13, fontWeight: 600, color: '#3E2723',
              textDecoration: 'none', transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#3E2723'; e.currentTarget.style.background = 'rgba(62,39,35,0.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.background = '#fff'; }}
            >{action.label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}
