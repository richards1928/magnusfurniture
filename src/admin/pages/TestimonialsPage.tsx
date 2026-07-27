import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { testimonialsService } from '../services/testimonials.service';
import type { AdminTestimonial } from '../types/admin.types';
import { Plus, Trash2, Star } from 'lucide-react';
import { FormField } from '../components/FormField';

export function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', company: '', location: '', quote: '', rating: 5, featured: false, status: 'published' as const });

  const load = () => testimonialsService.getAll().then(setTestimonials);
  useEffect(() => { load(); }, []);

  const set = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await testimonialsService.create(form);
    setForm({ name: '', role: '', company: '', location: '', quote: '', rating: 5, featured: false, status: 'published' });
    setShowForm(false);
    load();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Testimonials</h1>
          <p style={{ fontSize: 14, color: '#888' }}>{testimonials.length} client reviews</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 20px', background: '#1A1612', color: '#fff',
          borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
        }}><Plus size={16} /> Add Testimonial</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ padding: 24, background: '#fff', borderRadius: 16, border: '1px solid #EBEBEB', marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <FormField label="Name" value={form.name} onChange={v => set('name', v)} required />
            <FormField label="Role / Title" value={form.role} onChange={v => set('role', v)} />
            <FormField label="Company" value={form.company} onChange={v => set('company', v)} />
            <FormField label="Location" value={form.location} onChange={v => set('location', v)} />
            <FormField label="Rating" type="number" value={form.rating} onChange={v => set('rating', Number(v))} />
            <FormField label="Status" type="select" value={form.status} onChange={v => set('status', v)}
              options={[{ label: 'Published', value: 'published' }, { label: 'Pending', value: 'pending' }, { label: 'Hidden', value: 'hidden' }]} />
          </div>
          <FormField label="Quote" type="textarea" value={form.quote} onChange={v => set('quote', v)} rows={3} style={{ marginBottom: 16 }} />
          <button type="submit" style={{ padding: '10px 24px', background: '#1A1612', color: '#fff', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Save Testimonial</button>
        </form>
      )}

      <DataTable
        data={testimonials}
        searchKeys={['name', 'company', 'quote']}
        columns={[
          { key: 'name', label: 'Client', sortable: true, render: (t) => (
            <div>
              <div style={{ fontWeight: 600, color: '#1A1A1A' }}>{t.name}</div>
              <div style={{ fontSize: 12, color: '#888' }}>{t.company}{t.location ? `, ${t.location}` : ''}</div>
            </div>
          )},
          { key: 'rating', label: 'Rating', render: (t) => (
            <div style={{ display: 'flex', gap: 1 }}>
              {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={12} fill="#D4AF37" color="#D4AF37" />)}
            </div>
          )},
          { key: 'quote', label: 'Quote', render: (t) => <span style={{ fontSize: 13, color: '#666' }}>"{t.quote.substring(0, 80)}..."</span> },
          { key: 'status', label: 'Status', render: (t) => (
            <span style={{
              padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
              background: t.status === 'published' ? 'rgba(45,138,78,0.1)' : 'rgba(0,0,0,0.05)',
              color: t.status === 'published' ? '#2D8A4E' : '#888',
            }}>{t.status}</span>
          )},
        ]}
        actions={(t) => (
          <button onClick={async (e) => { e.stopPropagation(); if (confirm('Delete?')) { await testimonialsService.remove(t.id); load(); } }}
            style={{ padding: 6, borderRadius: 6, border: '1px solid #E5E5E5', background: '#fff', cursor: 'pointer' }}>
            <Trash2 size={14} color="#C0392B" />
          </button>
        )}
        emptyMessage="No testimonials yet."
      />
    </div>
  );
}
