import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormField } from '../components/FormField';
import { ImageUploader } from '../components/ImageUploader';
import { productsService } from '../services/products.service';
import { ArrowLeft } from 'lucide-react';

const emptyProduct = {
  name: '', slug: '', category: '', price: 0, originalPrice: 0,
  shortDescription: '', description: '', badge: '',
  specifications: {} as Record<string, string>,
  dimensions: { width: '', height: '', depth: '', weight: '' as string | undefined },
  images: [] as string[], status: 'draft' as 'active' | 'draft' | 'archived', featured: false,
};

export function ProductForm() {
  const { id } = useParams();
  const isEdit = !!id && id !== 'new';
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyProduct);
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      productsService.getById(id).then(p => {
        if (p) setForm({
          name: p.name, slug: p.slug, category: p.category,
          price: p.price, originalPrice: p.originalPrice || 0,
          shortDescription: p.shortDescription, description: p.description,
          badge: p.badge || '', specifications: p.specifications || {},
          dimensions: p.dimensions ? { ...p.dimensions, weight: p.dimensions.weight || '' } : { width: '', height: '', depth: '', weight: '' },
          images: p.images || [], status: p.status, featured: p.featured,
        });
      });
    }
  }, [id, isEdit]);

  const set = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));
  const setDim = (key: string, value: string) => setForm(prev => ({
    ...prev, dimensions: { ...prev.dimensions, [key]: value },
  }));

  const addSpec = () => {
    if (specKey && specVal) {
      setForm(prev => ({ ...prev, specifications: { ...prev.specifications, [specKey]: specVal } }));
      setSpecKey(''); setSpecVal('');
    }
  };

  const removeSpec = (key: string) => {
    setForm(prev => {
      const specs = { ...prev.specifications };
      delete specs[key];
      return { ...prev, specifications: specs };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const data = { ...form, slug };

    if (isEdit) {
      await productsService.update(id, data);
    } else {
      await productsService.create(data);
    }
    setSaving(false);
    navigate('/admin/products');
  };

  return (
    <div>
      <button onClick={() => navigate('/admin/products')} style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: 14, color: '#888', marginBottom: 24,
      }}><ArrowLeft size={16} /> Back to Products</button>

      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#1A1A1A', marginBottom: 32 }}>
        {isEdit ? 'Edit Product' : 'New Product'}
      </h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 800 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
          <FormField label="Product Name" value={form.name} onChange={v => set('name', v)} required placeholder="Executive Ergonomic Chair" />
          <FormField label="Slug" value={form.slug} onChange={v => set('slug', v)} placeholder="auto-generated-from-name" />
          <FormField label="Category" value={form.category} onChange={v => set('category', v)} required placeholder="Executive Chairs" />
          <FormField label="Badge" value={form.badge} onChange={v => set('badge', v)} placeholder="Bestseller, New, etc." />
          <FormField label="Price (₹)" type="number" value={form.price} onChange={v => set('price', Number(v))} required />
          <FormField label="Original Price (₹)" type="number" value={form.originalPrice || ''} onChange={v => set('originalPrice', Number(v))} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <FormField label="Short Description" value={form.shortDescription} onChange={v => set('shortDescription', v)} placeholder="Brief one-liner" />
        </div>
        <div style={{ marginBottom: 24 }}>
          <FormField label="Full Description" type="textarea" value={form.description} onChange={v => set('description', v)} rows={5} />
        </div>

        {/* Status and featured */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          <FormField label="Status" type="select" value={form.status} onChange={v => set('status', v)}
            options={[{ label: 'Active', value: 'active' }, { label: 'Draft', value: 'draft' }, { label: 'Archived', value: 'archived' }]}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#666' }}>Featured</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
              <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
              Show in featured collection
            </label>
          </div>
        </div>

        {/* Dimensions */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, marginTop: 16 }}>Dimensions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          <FormField label="Width" value={form.dimensions.width} onChange={v => setDim('width', v)} placeholder="120 cm" />
          <FormField label="Height" value={form.dimensions.height} onChange={v => setDim('height', v)} placeholder="75 cm" />
          <FormField label="Depth" value={form.dimensions.depth} onChange={v => setDim('depth', v)} placeholder="60 cm" />
          <FormField label="Weight" value={form.dimensions.weight || ''} onChange={v => setDim('weight', v)} placeholder="18 kg" />
        </div>

        {/* Specifications */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Specifications</h3>
        <div style={{ marginBottom: 24 }}>
          {Object.entries(form.specifications).map(([k, v]) => (
            <div key={k} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '8px 12px', background: '#FAFAFA', borderRadius: 8,
              marginBottom: 8, fontSize: 14,
            }}>
              <span style={{ fontWeight: 600, color: '#333', minWidth: 120 }}>{k}</span>
              <span style={{ color: '#666', flex: 1 }}>{v}</span>
              <button type="button" onClick={() => removeSpec(k)} style={{
                background: 'none', border: 'none', color: '#C0392B', cursor: 'pointer', fontSize: 13,
              }}>Remove</button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={specKey} onChange={e => setSpecKey(e.target.value)} placeholder="Spec name"
              style={{ flex: 1, padding: '10px 12px', border: '1px solid #E5E5E5', borderRadius: 8, fontSize: 14 }} />
            <input value={specVal} onChange={e => setSpecVal(e.target.value)} placeholder="Spec value"
              style={{ flex: 1, padding: '10px 12px', border: '1px solid #E5E5E5', borderRadius: 8, fontSize: 14 }} />
            <button type="button" onClick={addSpec} style={{
              padding: '10px 16px', background: '#3E2723', color: '#fff', borderRadius: 8,
              border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
            }}>Add</button>
          </div>
        </div>

        {/* Images */}
        <div style={{ marginBottom: 32 }}>
          <ImageUploader images={form.images} onChange={imgs => set('images', imgs)} />
        </div>

        <button type="submit" disabled={saving} style={{
          padding: '14px 32px', background: '#1A1612', color: '#fff',
          borderRadius: 10, fontSize: 14, fontWeight: 600,
          cursor: saving ? 'wait' : 'pointer', border: 'none',
        }}>
          {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
