import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { categoriesService } from '../services/categories.service';
import type { AdminCategory } from '../types/admin.types';
import { Plus, Trash2 } from 'lucide-react';
import { FormField } from '../components/FormField';

export function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', description: '', productCount: 0, status: 'active' as const });

  const load = () => categoriesService.getAll().then(setCategories);
  useEffect(() => { load(); }, []);

  const set = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-');
    await categoriesService.create({ ...form, slug });
    setForm({ name: '', slug: '', description: '', productCount: 0, status: 'active' });
    setShowForm(false);
    load();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Categories</h1>
          <p style={{ fontSize: 14, color: '#888' }}>{categories.length} categories</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 20px', background: '#1A1612', color: '#fff',
          borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
        }}><Plus size={16} /> Add Category</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ padding: 24, background: '#fff', borderRadius: 16, border: '1px solid #EBEBEB', marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <FormField label="Name" value={form.name} onChange={v => set('name', v)} required placeholder="Executive Chairs" />
            <FormField label="Slug" value={form.slug} onChange={v => set('slug', v)} placeholder="auto-generated" />
          </div>
          <FormField label="Description" type="textarea" value={form.description} onChange={v => set('description', v)} rows={2} style={{ marginBottom: 16 }} />
          <button type="submit" style={{ padding: '10px 24px', background: '#1A1612', color: '#fff', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Save Category</button>
        </form>
      )}

      <DataTable
        data={categories}
        searchKeys={['name']}
        columns={[
          { key: 'name', label: 'Category', sortable: true, render: (c) => <span style={{ fontWeight: 600, color: '#1A1A1A' }}>{c.name}</span> },
          { key: 'slug', label: 'Slug' },
          { key: 'description', label: 'Description', render: (c) => <span style={{ color: '#888', fontSize: 13 }}>{c.description.substring(0, 60)}{c.description.length > 60 ? '...' : ''}</span> },
          { key: 'status', label: 'Status', render: (c) => (
            <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
              background: c.status === 'active' ? 'rgba(45,138,78,0.1)' : 'rgba(0,0,0,0.05)',
              color: c.status === 'active' ? '#2D8A4E' : '#888',
            }}>{c.status}</span>
          )},
        ]}
        actions={(c) => (
          <button onClick={async (e) => { e.stopPropagation(); if (confirm('Delete?')) { await categoriesService.remove(c.id); load(); } }}
            style={{ padding: 6, borderRadius: 6, border: '1px solid #E5E5E5', background: '#fff', cursor: 'pointer' }}>
            <Trash2 size={14} color="#C0392B" />
          </button>
        )}
        emptyMessage="No categories yet."
      />
    </div>
  );
}
