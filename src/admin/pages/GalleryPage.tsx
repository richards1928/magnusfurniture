import { useEffect, useState } from 'react';
import { galleryService } from '../services/gallery.service';
import type { GalleryItem } from '../types/admin.types';
import { Plus, Trash2 } from 'lucide-react';
import { FormField } from '../components/FormField';
import { ImageUploader } from '../components/ImageUploader';

export function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', image: '', category: '', featured: false });
  const [images, setImages] = useState<string[]>([]);

  const load = () => galleryService.getAll().then(setItems);
  useEffect(() => { load(); }, []);

  const set = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await galleryService.create({ ...form, image: images[0] || '' });
    setForm({ title: '', description: '', image: '', category: '', featured: false });
    setImages([]);
    setShowForm(false);
    load();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Gallery</h1>
          <p style={{ fontSize: 14, color: '#888' }}>{items.length} portfolio images</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 20px', background: '#1A1612', color: '#fff',
          borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
        }}><Plus size={16} /> Upload Image</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ padding: 24, background: '#fff', borderRadius: 16, border: '1px solid #EBEBEB', marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <FormField label="Title" value={form.title} onChange={v => set('title', v)} required />
            <FormField label="Category" value={form.category} onChange={v => set('category', v)} placeholder="Office, Meeting Room, etc." />
          </div>
          <FormField label="Description" type="textarea" value={form.description} onChange={v => set('description', v)} rows={2} style={{ marginBottom: 16 }} />
          <div style={{ marginBottom: 16 }}>
            <ImageUploader images={images} onChange={setImages} maxImages={1} />
          </div>
          <button type="submit" style={{ padding: '10px 24px', background: '#1A1612', color: '#fff', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Save</button>
        </form>
      )}

      {/* Grid display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {items.map(item => (
          <div key={item.id} style={{
            borderRadius: 12, overflow: 'hidden', background: '#fff',
            border: '1px solid #EBEBEB',
          }}>
            <div style={{
              width: '100%', aspectRatio: '4/3',
              background: item.image ? `url(${item.image}) center/cover` : 'linear-gradient(135deg, #F5F5F5, #EBEBEB)',
            }} />
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1A1A1A' }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{item.category}</div>
                </div>
                <button onClick={async () => { if (confirm('Delete?')) { await galleryService.remove(item.id); load(); } }}
                  style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Trash2 size={14} color="#C0392B" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: 48, textAlign: 'center', color: '#AAA', fontSize: 14 }}>
            No gallery items yet. Upload your first project photo.
          </div>
        )}
      </div>
    </div>
  );
}
